import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCardsPage } from './my-cards.page';

describe('MyCardsPage', () => {
  let component: MyCardsPage;
  let fixture: ComponentFixture<MyCardsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
