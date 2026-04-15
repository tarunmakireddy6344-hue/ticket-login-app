import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface ServiceEntry {
  title: string;
  description: string;
  url: string;
  icon: string;
  category: string;
  color: string;
  featured?: boolean;
}

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  username = signal('User');
  searchQuery = signal('');
  currentTime = signal('');
  currentDate = signal('');

  private readonly ALL_SERVICES: ServiceEntry[] = [
    {
      title: 'Shopping',
      description: 'Explore the latest trends top brands on Myntra',
      url: 'https://www.myntra.com/',
      icon: 'shopping_bag',
      category: 'Lifestyle',
      color: '#ec4899'
    },
    {
      title: 'Traveling',
      description: 'Book flights and train tickets flawlessly on Ixigo',
      url: 'https://www.ixigo.com/',
      icon: 'flight',
      category: 'Travel',
      color: '#06b6d4'
    },
    {
      title: 'Hotel Booking',
      description: 'Find unique and comfortable stays via Airbnb',
      url: 'https://www.airbnb.com/',
      icon: 'hotel',
      category: 'Travel',
      color: '#fb923c'
    },
    {
      title: 'Upcoming Events',
      description: 'Find the best movies, concerts, and stand-up shows',
      url: 'https://in.bookmyshow.com/',
      icon: 'confirmation_number',
      category: 'Tickets',
      color: '#ef4444',
      featured: true
    },
    {
      title: 'Daily News',
      description: 'Catch up on current affairs with Times of India',
      url: 'https://timesofindia.indiatimes.com/',
      icon: 'newspaper',
      category: 'News',
      color: '#a78bfa'
    },
    {
      title: 'Food Delivery',
      description: 'Order delicious meals from top restaurants on Zomato',
      url: 'https://www.zomato.com/',
      icon: 'restaurant',
      category: 'Food',
      color: '#f87171'
    },
    {
      title: 'Book Your Ride',
      description: 'Dedicated to making every ride safe and comfortable.',
      url: 'https://www.rapido.bike/Home',
      icon: 'motorcycle',
      category: 'Transport',
      color: '#fbbf24'
    }
  ];

  filteredServices = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.ALL_SERVICES.filter(s => 
      s.title.toLowerCase().includes(query) || 
      s.category.toLowerCase().includes(query)
    );
  });

  ngOnInit() {
    const rawName = history.state.username || 'user';
    this.username.set(rawName.charAt(0).toUpperCase() + rawName.slice(1));
    
    this.updateClock();
    // Update clock every minute
    setInterval(() => this.updateClock(), 60000);
  }

  private updateClock() {
    const now = new Date();
    this.currentTime.set(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    this.currentDate.set(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  navigateTo(url: string) {
    window.open(url, '_blank');
  }
}
