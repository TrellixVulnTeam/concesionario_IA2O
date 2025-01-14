import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUsuario, MsnApiLogin, MsnApiRegister } from '../interfaces/UsuarioInterface';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  
  public token: string = null;
  public rol: string;
  public usuario: IUsuario;
  private userStorage = new Subject <IUsuario>();
  public userStorageObservable = this.userStorage.asObservable();

  constructor(private http: HttpClient, private storage: Storage) { }

  public getUsuarios(){
    return this.http.get('http://apivehiculos.test/api/usuarios');
  }

  login (login: string, password: string): Promise<MsnApiLogin>{
    const data = { login, password };
    const ruta = `${ URL }login`;
    console.log (ruta, data);
    return new Promise( resolve => {
      this.http.post<MsnApiLogin>(ruta, data)
        .subscribe( respuesta => {    
          console.log(respuesta);      //hemos de hacer el TIPADO con INTERFACES
          if (respuesta.status == 'success'){
            this.saveToken(respuesta.token.access_token);
            this.saveUser(respuesta.user);
            //si llega aquí la promesa devuelve true indicando que todo ha sido OK
            resolve(respuesta);
          } else {
              this.token = null;
              this.storage.clear();
              //la promesa devuelve false indicando que ha habido un ERROR
              resolve (respuesta);
          }
      });
    });
  }
  
  //devuelve una promesa (async)
  async saveToken(token: string){ 
    this.token = token;
    //espero (await) a que se guarde el token en el storage antes de continuar
    await this.storage.set('token', token); 
  }

  async saveUser(user: IUsuario){ 
    this.usuario = user;
    await this.storage.set('usuario', user);
    this.rol = user.rol
    this.userStorage.next(this.usuario);
    //next emite this.usuario a todos los componentes subscritos a este dato
  }
  

  registro (usuario: IUsuario): Promise<MsnApiRegister>{

    const ruta = `${ URL }registro`;
    const data = usuario;
    console.log (ruta, data);

    return new Promise ( resolve => {
      this.http.post<MsnApiRegister>(ruta, data)
        .subscribe (respuesta => {
          if (respuesta.status == 'success'){
            resolve(respuesta)
          }else{
            this.token = null;
            this.storage.clear();
            resolve (respuesta);
          }
        });
    });
  }

  getUsuarioStorage(): Promise<IUsuario>{
    return new Promise<IUsuario> ( resolve => {
      this.storage.get('usuario')
        .then (user => {
          resolve (user);
        });
    });
  }
  getToken(): Promise<any>{
    return new Promise<any> (resolve => {
      this.storage.get('token')
        .then ( token => {
          resolve(token);
        });
    });
  }

  async getPerfil(){
    const token = await this.getToken();
    console.log (token);
  }
}
