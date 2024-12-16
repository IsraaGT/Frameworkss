<?php
/**
 * Página de inicio personalizada.
 * @var \App\View\AppView $this
 */
?>
<div class="usuarios home content">
    <h1><?= __('Bienvenido, ') . h($usuario->nombre) ?>!</h1>
    <p><?= __('¡Te damos la bienvenida! Usa los botones de abajo para gestionar tu cuenta.') ?></p>
    <div class="actions">
        <?= $this->Html->link(__('Cambiar Nombre de Usuario'), ['action' => 'edit', $usuario->id], ['class' => 'button']) ?>
        <?= $this->Form->postLink(__('Eliminar Cuenta'), ['action' => 'delete', $usuario->id], [
            'confirm' => __('¿Estás seguro de que deseas eliminar tu cuenta?'),
            'class' => 'button button-danger'
        ]) ?>
    </div>
</div>
