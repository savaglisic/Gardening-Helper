import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GardeningGoodiesComponent } from './gardeninggoodies.component';

describe('GardeningGoodiesComponent', () => {
  let component: GardeningGoodiesComponent;
  let fixture: ComponentFixture<GardeningGoodiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GardeningGoodiesComponent]
    });
    fixture = TestBed.createComponent(GardeningGoodiesComponent);
    component = fixture.componentInstance;
  });

  it('should click Set button', async(() => {
    fixture.detectChanges();
    let buttonElement = fixture.debugElement.query(By.css('.set-button'));
    let p = fixture.debugElement.nativeElement.querySelector('p');

    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    }));
});
