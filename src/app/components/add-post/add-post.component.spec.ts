//импорт  модулей для тестирования
/** Инициализация тестовой среды
 *@ComponentFixture ,
 *@TestBed -- импорты из модуля  @angular/core/testing , используемые для создания и настройки тестовой среды для компонентов Angular.  */
import {ComponentFixture, TestBed} from '@angular/core/testing';

/** @AddPostComponent -- импорт компонента  AddPostComponent , который будет тестироваться.  */
import {AddPostComponent} from './add-post.component';
/**@FormBuilder,
 * @ReactiveFormsModule  -- импорты из модуля  @angular/forms , используемые для создания и управления формами в Angular*/
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
/**@AddPostService --  импорт сервиса  AddPostService , который предоставляет функциональность для добавления постов.  */
import {AddPostService} from '../../services/add-post.service';
/**@CommonService --  импорт сервиса  CommonService , который предоставляет общие функции и данные для различных компонентов и сервисов в приложении.   */
import {CommonService} from 'src/app/services/common.service';
/**@HttpClientModule  -- импорт модуля  HttpClientModule  из  @angular/common/http, который предоставляет функциональность для выполнения HTTP-запросов.  */
import {HttpClientModule} from '@angular/common/http';
/**@of  - импорт функции  of  из модуля  rxjs , используемой для создания Observable, который эмитирует определенные значения.  */
import {of} from 'rxjs';


/**Описываем тестовый набор (test suite) для компонента с помощью
 * @describe().  */

describe('AddPostComponent', () => {
  /**@component - ссылка на экземпляр тестируемого компонента  */
  let component: AddPostComponent;
  /**@fixture - фикстура компонента. Fixture   */
  let fixture: ComponentFixture<AddPostComponent>;
  /**@addPostService - экземпляр сервиса AddPostService  */
  let addPostService: AddPostService;
  /**@commonService - экземпляр сервиса CommonService */
  let commonService: CommonService;
  /**@formBuilder - экземпляр FormBuilder */
  let formBuilder: FormBuilder;

  /** */
  /**В
   * @beforeEach(async) происходит асинхронная настройка тестовой среды. Вызывается метод
   * @configureTestingModule() и передаются */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      /**@imports - модули, необходимые для компонента и сервисов */
      imports: [ReactiveFormsModule, HttpClientModule],
      /**@declarations - тестируемые компоненты  */
      declarations: [AddPostComponent],
      /**@providers - тестируемые сервисы  */
      providers: [AddPostService, CommonService, FormBuilder]
      /** Затем вызывается метод
       * @compileComponents() для компиляции компонентов.*/
    }).compileComponents();
  });

  /**
   *В
   * @@beforeEach() создается {@see фикстура} компонента с помощью
   * @TestBed.createComponent(), получается ссылка на компонент и инжектируются сервисы с помощью
   * @TestBed.inject(). Вызывается метод
   * @detectChanges() для обнаружения изменений в компоненте.*/
  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    addPostService = TestBed.inject(AddPostService);
    commonService = TestBed.inject(CommonService);
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  /**
   * Описание теста. Проверяется, что если идентификатор поста пустой,
   * то при отправке формы вызывается метод
   * @addPost() сервиса
   * @addPostService
   * и метод
   * @notifyPostAddition() сервиса commonService.
   */
  it('should call addPostService.addPost() if post ID is empty', () => {
    //Перехватываем вызова обьекта addPostService с методом addPost Задаем имитированное возваращаемое значение метода 'addPost' со значением status: 'success'
    spyOn(addPostService, 'addPost').and.returnValue(of({status: 'success'}));
    // Перехватываем вызов метода  notifyPostAddition  из сервиса commonService
    spyOn(commonService, 'notifyPostAddition');
    // Устанавливаются тестовые значения для полей формы.
    component.postForm.setValue({title: 'Test Title', text: 'Test Text'});
    //Вызывается метод onSubmit() для отправки формы.
    component.onSubmit();
    // * Проверяется, что метод addPost() сервиса addPostService был вызван с объектом post, созданным на основе данных формы
    expect(addPostService.addPost).toHaveBeenCalledWith(component.post);
    // Проверяем, был ли вызван  объект commonService с методом notifyPostAddition
    expect(commonService.notifyPostAddition).toHaveBeenCalled();
  });

  it('should not call addPostService.addPost() or addPostService.updatePost() if title or text is empty', () => {
    // Создаем шпионов для методов addPost() и updatePost() в сервисе addPostService
    spyOn(addPostService, 'addPost');
    spyOn(addPostService, 'updatePost');
    // Создаем шпиона для метода notifyPostAddition() в сервисе commonService
    spyOn(commonService, 'notifyPostAddition');

    // Устанавливаем значения формы, где заголовок пустой, а текст - 'Test Text'
    component.postForm.setValue({ title: '', text: 'Test Text' });

    // Вызываем метод onSubmit() компонента
    component.onSubmit();

    // Проверяем, что метод addPost() не был вызван
    expect(addPostService.addPost).not.toHaveBeenCalled();
    // Проверяем, что метод updatePost() не был вызван
    expect(addPostService.updatePost).not.toHaveBeenCalled();
    // Проверяем, что метод notifyPostAddition() не был вызван
    expect(commonService.notifyPostAddition).not.toHaveBeenCalled();
    // Проверяем, что форма является недопустимой (invalid)
    expect(component.postForm.invalid).toBeTruthy();
  });

  it('should not call addPostService.addPost() or addPostService.updatePost() if title or text is empty', () => {
    // Создаем шпионов для методов addPost() и updatePost() в сервисе addPostService
    spyOn(addPostService, 'addPost');
    spyOn(addPostService, 'updatePost');
    // Создаем шпиона для метода notifyPostAddition() в сервисе commonService
    spyOn(commonService, 'notifyPostAddition');

    // Устанавливаем значения формы, где заголовок - 'Test Title', а текст пустой
    component.postForm.setValue({ title: 'Test Title', text: '' });

    // Вызываем метод onSubmit() компонента
    component.onSubmit();

    // Проверяем, что метод addPost() не был вызван
    expect(addPostService.addPost).not.toHaveBeenCalled();
    // Проверяем, что метод updatePost() не был вызван
    expect(addPostService.updatePost).not.toHaveBeenCalled();
    // Проверяем, что метод notifyPostAddition() не был вызван
    expect(commonService.notifyPostAddition).not.toHaveBeenCalled();
    // Проверяем, что форма является недопустимой (invalid)
    expect(component.postForm.invalid).toBeTruthy();
  });

  it('should call addPostService.updatePost() if post ID is not empty', () => {
    // Создаем шпиона для метода updatePost() в сервисе addPostService и задаем имитированное возвращаемое значение
    spyOn(addPostService, 'updatePost').and.returnValue(of({status: 'success'}));
    // Создаем шпиона для метода notifyPostAddition() в сервисе commonService
    spyOn(commonService, 'notifyPostAddition');

    // Устанавливаем идентификатор поста равным 'post-id'
    component.post.setId('post-id');
    // Устанавливаем значения формы
    component.postForm.setValue({title: 'Test Title', text: 'Test Text'});

    // Вызываем метод onSubmit() компонента
    component.onSubmit();

    // Проверяем, что метод updatePost() был вызван с правильными аргументами
    expect(addPostService.updatePost).toHaveBeenCalledWith(component.post);
    // Проверяем, что метод notifyPostAddition() был вызван
    expect(commonService.notifyPostAddition).toHaveBeenCalled();
  });

  it('should not call addPostService.addPost() or addPostService.updatePost() if form is invalid', () => {
    // Создаем шпионов для методов addPost() и updatePost() в сервисе addPostService
    spyOn(addPostService, 'addPost');
    spyOn(addPostService, 'updatePost');
    // Создаем шпиона для метода notifyPostAddition() в сервисе commonService
    spyOn(commonService, 'notifyPostAddition');

    // Вызываем метод onSubmit() компонента
    component.onSubmit();

    // Проверяем, что метод addPost() не был вызван
    expect(addPostService.addPost).not.toHaveBeenCalled();
    // Проверяем, что метод updatePost() не был вызван
    expect(addPostService.updatePost).not.toHaveBeenCalled();
    // Проверяем, что метод notifyPostAddition() не был вызван
    expect(commonService.notifyPostAddition).not.toHaveBeenCalled();
  });
});

// Словарик, чтобы запомнить и понять лучше
/**{@link фикстура } (fixture) - это объект, предоставляемый Angular для тестирования компонентов. Он содержит ссылку на тестируемый компонент и методы для взаимодействия с ним.
 *
 * Простыми словами, фикстура позволяет нам:
 *
 * - Создать экземпляр тестируемого компонента
 * - Получить ссылку на этот компонент
 * - Вызвать методы жизненного цикла компонента (ngOnInit, ngOnDestroy и т.д.)
 * - Отправлять входные данные компоненту (например, через @Input)
 * - Проверять выходные данные компонента (например, через @Output)
 * - Вызывать пользовательские методы компонента
 * - Очищать компонент после завершения теста
 *
 * Таким образом, фикстура предоставляет нам API для полноценного тестирования компонента в изолированной среде.  */

/**{@link spyOn()} метод отвечает за перехват вызовов методов в Angular. Он используется для имитации поведения методов в тестах.
 *
 * @spyOn() принимает два параметра:
 *
 * 1. Объект, содержащий метод, вызов которого нужно перехватить.
 * 2. Имя метода, вызов которого нужно перехватить.
 * @spyOn(service, 'methodName');
 * Этот код будет перехватывать вызовы метода methodName у сервиса service.
 *
 * После вызова spyOn() можно:
 *
 * 1. Задать имитированное возвращаемое значение метода с помощью and.returnValue():
 * @spyOn(service, 'methodName').and.returnValue(someValue)
 *
 * 2. Проверить, что метод был вызван, с помощью toHaveBeenCalled():
 * @@spyOn(service, 'methodName').expect(service.methodName).toHaveBeenCalled();
 *
 * 3.Проверить, что метод был вызван с определенными аргументами, с помощью toHaveBeenCalledWith():
 * @expect(service.methodName).toHaveBeenCalledWith(arg1, arg2);
 * */
