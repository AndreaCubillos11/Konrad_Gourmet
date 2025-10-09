// admin-layout.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';  // Para mockear Router
import { Router } from '@angular/router';  // Importa Router si no está

import { AdminLayoutComponent } from './admin-layout.component';  // Ajusta el path si es necesario

describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;
  let mockRouter: jasmine.SpyObj<Router>;  // Mock para Router

  beforeEach(async () => {
    // Mock del Router
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ AdminLayoutComponent ],  // Declara el componente
      imports: [
        RouterTestingModule  // Mockea RouterModule para tests
      ],
      providers: [
        { provide: Router, useValue: mockRouter }  // Provee el mock
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Test básico: el componente se crea
  });

  it('should call router.navigate on logout', () => {
    // Test para el método logout
    component.logout();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);  // Verifica que navegue a login
  });
});
