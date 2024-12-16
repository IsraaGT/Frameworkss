<?php
declare(strict_types=1);

namespace App\Controller;

/**
 * Usuarios Controller
 *
 * @property \App\Model\Table\UsuariosTable $Usuarios
 */
class UsuariosController extends AppController
{
    public function login()
{
    if ($this->request->is('post')) {
        $correo = $this->request->getData('correo');
        $clave = $this->request->getData('clave');
        

        // Busca al usuario activo con las credenciales proporcionadas
        $usuario = $this->Usuarios->find()
            ->where(['correo' => $correo, 'clave' => $clave, 'status' => 1])
            ->first();

        if ($usuario) {
            $this->request->getSession()->write('Auth.Usuario', $usuario);
            return $this->redirect(['action' => 'home']);
        } else {
            $this->Flash->error(__('Correo o clave incorrectos, o la cuenta no está activa.'));
        }
    }
}

public function register()
{
    $usuario = $this->Usuarios->newEmptyEntity();
    if ($this->request->is('post')) {
        $correo = $this->request->getData('correo');
        $usuarioExistente = $this->Usuarios->find()->where(['correo' => $correo])->first();

        if ($usuarioExistente) {
            if ($usuarioExistente->status == 0) {
                // Reactivar cuenta si estaba inactiva
                $usuarioExistente->clave = $this->request->getData('clave');
                $usuarioExistente->status = 1;

                if ($this->Usuarios->save($usuarioExistente)) {
                    $this->Flash->success(__('Cuenta reactivada. Ahora puedes iniciar sesión.'));
                    return $this->redirect(['action' => 'login']);
                } else {
                    $this->Flash->error(__('No se pudo reactivar la cuenta. Inténtalo de nuevo.'));
                }
            } else {
                $this->Flash->error(__('Este correo ya está registrado y activo. Por favor, inicia sesión.'));
                return $this->redirect(['action' => 'login']);
            }
        } else {
            $usuario = $this->Usuarios->patchEntity($usuario, $this->request->getData());
            if ($this->Usuarios->save($usuario)) {
                $this->Flash->success(__('Registro exitoso. Ahora puedes iniciar sesión.'));
                return $this->redirect(['action' => 'login']);
            }
            $this->Flash->error(__('El registro falló. Inténtalo de nuevo.'));
        }
    }
    $this->set(compact('usuario'));
}

public function home()
{
    $usuario = $this->request->getSession()->read('Auth.Usuario');
    if (!$usuario) {
        return $this->redirect(['action' => 'login']);
    }

    $this->set(compact('usuario'));
}

public function logout()
{
    $this->request->getSession()->destroy();
    $this->Flash->success(__('Has cerrado sesión.'));
    return $this->redirect(['action' => 'login']);
}

public function updateUsername()
{
    $usuario = $this->request->getSession()->read('Auth.Usuario');
    if (!$usuario) {
        return $this->redirect(['action' => 'login']);
    }

    $usuarioEntity = $this->Usuarios->get($usuario->id);
    if ($this->request->is(['patch', 'post', 'put'])) {
        $usuarioEntity->nombre = $this->request->getData('nombre');
        if ($this->Usuarios->save($usuarioEntity)) {
            $this->request->getSession()->write('Auth.Usuario', $usuarioEntity);
            $this->Flash->success(__('Tu nombre de usuario se ha actualizado.'));
            return $this->redirect(['action' => 'home']);
        }
        $this->Flash->error(__('No se pudo actualizar el nombre. Inténtalo de nuevo.'));
    }
    $this->set(compact('usuarioEntity'));
}

public function deleteAccount()
{
    $usuario = $this->request->getSession()->read('Auth.Usuario');
    if (!$usuario) {
        return $this->redirect(['action' => 'login']);
    }

    $usuarioEntity = $this->Usuarios->get($usuario->id);
    $usuarioEntity->status = 0;

    if ($this->Usuarios->save($usuarioEntity)) {
        $this->request->getSession()->destroy();
        $this->Flash->success(__('Tu cuenta ha sido desactivada.'));
        return $this->redirect(['action' => 'login']);
    }

    $this->Flash->error(__('No se pudo desactivar tu cuenta. Inténtalo de nuevo.'));
    return $this->redirect(['action' => 'home']);
}

    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */
    public function index()
    {
        $query = $this->Usuarios->find();
        $usuarios = $this->paginate($query);

        $this->set(compact('usuarios'));
    }

    /**
     * View method
     *
     * @param string|null $id Usuario id.
     * @return \Cake\Http\Response|null|void Renders view
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $usuario = $this->Usuarios->get($id, contain: []);
        $this->set(compact('usuario'));
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $usuario = $this->Usuarios->newEmptyEntity();
        if ($this->request->is('post')) {
            $usuario = $this->Usuarios->patchEntity($usuario, $this->request->getData());
            if ($this->Usuarios->save($usuario)) {
                $this->Flash->success(__('The usuario has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The usuario could not be saved. Please, try again.'));
        }
        $this->set(compact('usuario'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Usuario id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $usuario = $this->Usuarios->get($id, contain: []);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $usuario = $this->Usuarios->patchEntity($usuario, $this->request->getData());
            if ($this->Usuarios->save($usuario)) {
                $this->Flash->success(__('The usuario has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The usuario could not be saved. Please, try again.'));
        }
        $this->set(compact('usuario'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Usuario id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $usuario = $this->Usuarios->get($id);
        if ($this->Usuarios->delete($usuario)) {
            $this->Flash->success(__('The usuario has been deleted.'));
        } else {
            $this->Flash->error(__('The usuario could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
