import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDialogComponent } from './chatcompoent.component';

describe('ChatDialogComponent', () => {
  let component: ChatDialogComponent;
  let fixture: ComponentFixture<ChatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
