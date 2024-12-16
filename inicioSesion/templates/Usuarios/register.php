<?php
// Código PHP
?>
<div class="usuarios form content">
    <h1><?= __('Registrarse') ?></h1>
    <?= $this->Form->create($usuario) ?>
    <fieldset>
        <?= $this->Form->control('nombre', ['label' => 'Nombre']) ?>
        <?= $this->Form->control('correo', ['label' => 'Correo']) ?>
        <?= $this->Form->control('clave', ['label' => 'Contraseña', 'type' => 'password']) ?>
    </fieldset>
    <?= $this->Form->button(__('Registrarse')) ?>
    <?= $this->Form->end() ?>
</div>
