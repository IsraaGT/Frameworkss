<?php
// Código PHP
?>
<div class="usuarios form content">
    <h1><?= __('Iniciar Sesión') ?></h1>
    <?= $this->Form->create() ?>
    <?= $this->Form->control('correo', ['label' => 'Correo']) ?>
    <?= $this->Form->control('clave', ['label' => 'Contraseña', 'type' => 'password']) ?>
    <?= $this->Form->button(__('Iniciar Sesión')) ?>
    <?= $this->Form->end() ?>
    <p><?= $this->Html->link(__('¿No tienes cuenta? Regístrate aquí.'), ['action' => 'register']) ?></p>
</div>


