import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  signupCredentials = {
    username: '',
    password: '',
    email: ''
  };

  isLoading = signal(false);
  isSignupModalOpen = signal(false);
  isForgotPasswordModalOpen = signal(false);
  forgotPasswordEmail = signal('');
  errorMessage = signal('');
  successMessage = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  toggleSignupModal(show: boolean) {
    this.isSignupModalOpen.set(show);
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  toggleForgotPasswordModal(show: boolean) {
    this.isForgotPasswordModalOpen.set(show);
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  onSubmit() {
    this.errorMessage.set('');
    this.successMessage.set('');
    this.isLoading.set(true);

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.successMessage.set(response.message);
          console.log('Token:', response.token);
          
          setTimeout(() => {
            this.router.navigate(['/welcome'], { state: { username: this.credentials.username } });
          }, 500); // 500ms delay to let the user see the success message
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        if (error.status === 401) {
          this.errorMessage.set('Invalid credentials. Please try again.');
        } else {
          this.errorMessage.set('An error occurred connecting to the server. Is it running?');
        }
      }
    });
  }

  onSignup() {
    this.errorMessage.set('');
    this.successMessage.set('');
    this.isLoading.set(true);

    this.authService.signup(this.signupCredentials).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.successMessage.set(response.message);
          setTimeout(() => {
            this.toggleSignupModal(false);
            // Autofill the login form with the new credentials
            this.credentials.username = this.signupCredentials.username;
            this.credentials.password = this.signupCredentials.password;
          }, 2000); // Give user time to read the success message
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        if (error.status === 400) {
          this.errorMessage.set(error.error.message || 'Username already exists.');
        } else {
          this.errorMessage.set('An error occurred during signup.');
        }
      }
    });
  }

  onForgotPassword() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    
    // Simulate API call
    setTimeout(() => {
      this.isLoading.set(false);
      this.successMessage.set('A password reset link has been sent to your email.');
      
      setTimeout(() => {
        this.toggleForgotPasswordModal(false);
      }, 3000);
    }, 1000);
  }
}
