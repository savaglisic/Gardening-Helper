import {ComponentFixture, TestBed, inject, tick, fakeAsync, waitForAsync} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LoginComponent } from '../app/login/login.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let db: DebugElement;

beforeEach (waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [LoginComponent],
    })
    .compileComponents();
}))

beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    db = fixture.debugElement;
    fixture.detectChanges();
});

it('it should create', () => {
    expect(component).toBeTruthy();
});

});