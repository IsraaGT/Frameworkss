from flask import Flask, render_template, request, redirect, url_for, session, flash
import os
import database as bd

# Configuración de la carpeta de plantillas
template_dir = os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
template_dir = os.path.join(template_dir, 'src', 'templates')

app = Flask(__name__, template_folder=template_dir)

# Clave secreta para sesiones
app.secret_key = 'kirby2003'

# RUTA PARA LOGIN
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Verificar usuario en la base de datos
        cursor = bd.database.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM flask WHERE username = %s AND password = %s AND status = 1",
            (username, password)
        )
        user = cursor.fetchone()

        if user:
            session['user_id'] = user['Id']
            session['username'] = user['username']
            flash('Inicio de sesión exitoso', 'success')
            return redirect(url_for('crud'))
        else:
            flash('Credenciales incorrectas o usuario inactivo', 'danger')

    return render_template('login.html')

# RUTA PARA LOGOUT
@app.route('/logout')
def logout():
    session.clear()
    flash('Sesión cerrada exitosamente', 'success')
    return redirect(url_for('login'))

# RUTA RAÍZ: SIEMPRE REDIRIGE AL LOGIN
@app.route('/')
def root():
    return redirect(url_for('login'))  # Siempre redirige al login

# RUTA PARA EL CRUD (PROTEGIDO)
@app.route('/home')
def crud():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    cursor = bd.database.cursor()
    cursor.execute("SELECT * FROM flask")
    myresult = cursor.fetchall()

    # Convertir los datos en un diccionario para renderizar en la vista
    insertObject = []
    columnNames = [column[0] for column in cursor.description]
    for record in myresult:
        insertObject.append(dict(zip(columnNames, record)))
    cursor.close()

    # Pasar el ID del usuario loggeado al template
    return render_template('index.html', data=insertObject, logged_user_id=session['user_id'])

# RUTA PARA GUARDAR USUARIOS
@app.route('/usuarios', methods=['POST'])
def addUser():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    username = request.form['username']
    name = request.form['name']
    password = request.form['password']

    if username and name and password:
        cursor = bd.database.cursor()
        sql = "INSERT INTO flask (username, name, password, status) VALUES (%s, %s, %s, 1)"
        data = (username, name, password)
        cursor.execute(sql, data)
        bd.database.commit()
    return redirect(url_for('crud'))

# RUTA PARA ELIMINAR USUARIOS
@app.route('/eliminar/<int:id>')
def eliminar(id):
    if 'user_id' not in session:
        return redirect(url_for('login'))

    cursor = bd.database.cursor()
    sql = "DELETE FROM flask WHERE Id = %s"
    data = (id,)
    cursor.execute(sql, data)
    bd.database.commit()
    flash('Usuario eliminado exitosamente', 'info')
    return redirect(url_for('crud'))

# RUTA PARA EDITAR USUARIOS
@app.route('/editar/<int:id>', methods=['POST'])
def edit(id):
    if 'user_id' not in session:
        return redirect(url_for('login'))

    username = request.form['username']
    name = request.form['name']
    password = request.form['password']

    if username and name and password:
        cursor = bd.database.cursor()
        sql = "UPDATE flask SET username = %s, name = %s, password = %s WHERE Id = %s"
        data = (username, name, password, id)
        cursor.execute(sql, data)
        bd.database.commit()
        flash('Usuario actualizado exitosamente', 'success')
    return redirect(url_for('crud'))

if __name__ == '__main__':
    app.run(debug=True, port=4000)
