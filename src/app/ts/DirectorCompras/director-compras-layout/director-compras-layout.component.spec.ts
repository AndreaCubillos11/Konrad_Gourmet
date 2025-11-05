import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { DirectorComprasLayoutComponent } from './director-compras-layout.component';  // Import ajustado al nuevo componente

describe('DirectorComprasLayoutComponent', () => {  // Nombre en describe cambiado
  let component: DirectorComprasLayoutComponent;  // Tipo del componente cambiado
  let fixture: ComponentFixture<DirectorComprasLayoutComponent>;  // Tipo del fixture cambiado
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [DirectorComprasLayoutComponent],  // Declaración ajustada
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorComprasLayoutComponent);  // Creación del componente cambiada
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call router.navigate on logout', () => {
    component.logout();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});