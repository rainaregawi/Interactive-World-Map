import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CountryComponent } from '../country/country.component';
import { CountryLookupService } from '../country-lookup.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CountryComponent],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  title = 'Map';

  selectedCountryEl: SVGElement | null = null;
  selectedCountryCode: string | null = null;
  countryInfo: any = null;
  
  constructor(private countryService: CountryLookupService) {}

  onCountryClick(event: MouseEvent): void {
    const path = (event.target as Element).closest('path') as SVGElement | null;
    if (!path || !path.id) return;


    if (this.selectedCountryEl && this.selectedCountryEl !== path) {
      this.selectedCountryEl.classList.remove('selected');
    }

    if (this.selectedCountryEl === path) {
      path.classList.remove('selected');
      this.selectedCountryEl = null;
      this.selectedCountryCode = null;
      this.countryInfo = null;
      return;
    }

    path.classList.add('selected');
    this.selectedCountryEl = path;
    this.selectedCountryCode = path.id;
    console.log('Clicked country:', this.selectedCountryCode);

    this.countryService.getCountryData(this.selectedCountryCode).subscribe({
      next: (data) => {
        console.log('Raw API response:', data);

        if (!Array.isArray(data) || !data[1] || data[1].length === 0) {
          console.warn('No data available for:', this.selectedCountryCode);
          this.countryInfo = { noData: true }; 
          return;
        }
        
        const countryData = data[1][0];
        this.countryInfo = {
          name: countryData.name || 'N/A',
          capital: countryData.capitalCity || 'N/A',
          region: countryData.region?.value || 'N/A',
          income: countryData.incomeLevel?.value || 'N/A',
          longitude: countryData.longitude || 'N/A',
          latitude: countryData.latitude || 'N/A'
        };
        console.log('Country data:', this.countryInfo);
      },
      error: (err) => {
        console.error('API error:', err);
        this.countryInfo = { noData: true }; 
      }
    });
  }
}





