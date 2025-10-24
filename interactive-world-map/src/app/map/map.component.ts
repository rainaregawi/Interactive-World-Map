import { Component } from '@angular/core';
import { CountryComponent } from '../country/country.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CountryComponent],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  selectedCountryEl: SVGElement | null = null;
  selectedCountryCode: string | null = null;

  onCountryClick(event: MouseEvent): void {
    const path = (event.target as Element).closest('path') as SVGElement | null;
    if (!path || !path.id) return;

    if (this.selectedCountryEl === path) {
      path.classList.remove('selected');
      this.selectedCountryEl = null;
      this.selectedCountryCode = null;
      console.log('Deselected country');
      return;
    }

    if (this.selectedCountryEl && this.selectedCountryEl !== path) {
      this.selectedCountryEl.classList.remove('selected');
    }

    path.classList.add('selected');
    this.selectedCountryEl = path;
    this.selectedCountryCode = path.id;

    console.log('Selected country:', this.selectedCountryCode);
  }
}

