/**
 * Этот тест проверяет работу AuthGuard.
 * AuthGuard - это сервис, который проверяет, аутентифицирован ли пользователь перед доступом к определенным маршрутам.
 * В данном тесте мы создаем экземпляр AuthGuard и AuthService, используя TestBed и его зависимости.*/

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, AuthService]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });


  /**  В первом тесте мы проверяем, что доступ разрешен, если пользователь аутентифицирован.
   * Мы подменяем метод isAuthenticated() сервиса AuthService, чтобы он всегда возвращал true.
   * Затем вызываем метод canActivate() AuthGuard с фиктивными параметрами ActivatedRouteSnapshot и RouterStateSnapshot.
   * Ожидаемый результат - true.
   *   */
 it('should allow access if user is authenticated', () => {

    spyOn(authService, 'isAuthenticated').and.returnValue(true);

    const result = guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot);

    expect(result).toBe(true);
  });

/** Во втором тесте мы проверяем, что происходит перенаправление на пустой маршрут, если пользователь не аутентифицирован.
  * Мы подменяем метод isAuthenticated() сервиса AuthService, чтобы он всегда возвращал false.
  * Затем вызываем метод canActivate() AuthGuard с фиктивными параметрами ActivatedRouteSnapshot и RouterStateSnapshot.
  * Ожидаемый результат - объект parseUrl() класса Router, соответствующий пустому маршруту.
  */

  it('should redirect to empty route if user is not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    const router = TestBed.inject(Router) as Router;
    spyOn(router, 'parseUrl');

    const result = guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot);

    expect(result).toEqual(router.parseUrl(''));
  });
});
