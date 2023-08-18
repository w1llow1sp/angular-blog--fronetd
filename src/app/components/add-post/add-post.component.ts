//Сначала импортируются необходимые зависимости
/**@Component - декоратор для определения компонент
 * @OnInit - интерфейс, который необходимо реализовать для инициализации компонента
 * @ViewChild - декоратор для получения ссылки на элемент в шаблоне компонента
 * @ElementRef - класс, представляющий собой обертку над нативным элементом DOM. Используется совместно с ViewChild.  */
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
/** @FormBuilder - Построения реактивной формы с помощью
 * @FormGroup - Определения типа  для формы
 * @Validators -Использования валидаторов из  для проверки формы  */
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
/** Импорт сервисов для компоненты*/
import {AddPostService} from '../../services/add-post.service';
import {CommonService} from 'src/app/services/common.service';
/** Использования модели Post для представления данных поста  */
import {Post} from '../../models/post.model';



@Component({
  //Селектор компоненты, если мы будем ее, допустим, испомртировать в код
  selector: 'app-add-post',
  //Путь до шаблона
  templateUrl: './add-post.component.html',
  //Путь до стилей
  styleUrls: ['./add-post.component.css']
})

// implements означает, что мы реализуем интерфейс OnInit
export class AddPostComponent implements OnInit {
  //postForm - реактивная форма для добавления/редактирования поста
  //submitted - флаг, показывающий была ли отправлена форма
  //post - объект типа Post, содержащий данные поста
  // closeBtn - ссылка на кнопку закрытия, полученная с помощью @ViewChild
  postForm: FormGroup;
  submitted = false;
  post: Post = new Post('', '');

  @ViewChild('closeBtn') closeBtn!: ElementRef;


  /**
   * Инициализируется форма postForm с полями title и text, оба обязательные (Validators.required)
   * Подписываемся на события postToEdit_Observable и postToAdd_Observable сервиса CommonService для получения данных поста при редактировании или добавлении  */
  constructor(
    private formBuilder: FormBuilder,
    private addPostService: AddPostService,
    private commonService: CommonService
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
    this.commonService.postToEdit_Observable.subscribe(res => {
      this.setPostToEdit();
    });
    this.commonService.postToAdd_Observable.subscribe(res => {
      this.setPostToEdit();
    });
  }

  //В методе ngOnInit выполняется инициализация компонента.
  ngOnInit() {
  }

  //Метод get f() возвращает доступ к полям формы.
  get f() {
    return this.postForm.controls;
  }

  /**Метод onSubmit вызывается при отправке формы. В нем:

   - Проверяется валидность формы. Если форма невалидна, метод завершается.
   - Значения из полей формы записываются в объект post.
   - Если идентификатор поста пустой, вызывается метод addPost сервиса AddPostService для добавления поста.
   - Если идентификатор поста не пустой, вызывается метод updatePost сервиса AddPostService для обновления поста.
   - После успешного добавления/обновления поста вызывается метод notifyPostAddition сервиса CommonService и закрывается модальное окно.
   - В случае ошибки выводится сообщение в консоль. */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.postForm.invalid) {
      return;
    }
    this.post.setTitle(this.f['title'].value);
    this.post.setText(this.f['text'].value);
    if (this.post.getId() === '') {
      this.addPostService.addPost(this.post).subscribe({
        next: (result: any) => {
          if (result ['status'] === 'success') {
            this.closeBtn.nativeElement.click();
            this.commonService.notifyPostAddition('');
          } else {
            console.log('Error adding post');
          }
        },
        error: (e: any) => {
        },
        complete: () => {
          console.info('complete')
        }
      });
    } else {
      this.addPostService.updatePost(this.post).subscribe({
        next: (result: any) => {
          if (result ['status'] === 'success') {
            this.closeBtn.nativeElement.click();
            this.commonService.notifyPostAddition('');
          } else {
            console.log('Error updating post');
          }
        }, error: (e: any) => {
        },
        complete: () => {
          console.info('complete')
        }
      });
    }
  }


  //Метод setPostToEdit() вызывается при редактировании существующего поста. Он заполняет форму данными выбранного поста.
  setPostToEdit() {
    this.post = this.commonService.postToEdit;
    this.postForm = this.formBuilder.group({
      title: [this.post.getTitle(), Validators.required],
      text: [this.post.getText(), Validators.required]
    });
  }

}
