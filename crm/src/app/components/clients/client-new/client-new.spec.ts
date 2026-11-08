import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientNew } from './client-new';

describe('ClientNew', () => {
  let component: ClientNew;
  let fixture: ComponentFixture<ClientNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientNew],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
