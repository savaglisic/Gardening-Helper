import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Directive, Input, HostListener } from '@angular/core';
export { RouterLink} from '@angular/router';
import { ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login/login.component';
 
@Directive({
  selector: '[routerLink]'
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;
 
  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
 
import { NgModule } from '@angular/core';
 
@NgModule({
  declarations: [
    RouterLinkDirectiveStub
  ]
})
export class RouterStubsModule {}

describe('Test Karma', () => 
it("should fail", function() {        
  expect(true).toBe(false); })
)

describe('AppComponent', () => {
beforeEach(async () => {
await TestBed.configureTestingModule({
declarations: [
AppComponent
],
}).compileComponents();
});

it('should create the app', () => {
const fixture = TestBed.createComponent(AppComponent);
const app = fixture.componentInstance;
expect(app).toBeTruthy();
});

it(`should have as title 'SimpleApp'`, () => {
const fixture = TestBed.createComponent(AppComponent);
const app = fixture.componentInstance;
expect(app.title).toEqual('FreeApp');
});

it('should render title', () => {
const fixture = TestBed.createComponent(AppComponent);
fixture.detectChanges();
const compiled = fixture.nativeElement as HTMLElement;
expect(compiled.querySelector('.content span')?.textContent).toContain('SimpleApp app is running!');
});
});
