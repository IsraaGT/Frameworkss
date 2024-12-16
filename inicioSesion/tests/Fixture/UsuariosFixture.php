<?php
declare(strict_types=1);

namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * UsuariosFixture
 */
class UsuariosFixture extends TestFixture
{
    /**
     * Init method
     *
     * @return void
     */
    public function init(): void
    {
        $this->records = [
            [
                'id' => 1,
                'nombre' => 'Lorem ipsum dolor sit amet',
                'correo' => 'Lorem ipsum dolor sit amet',
                'clave' => 'Lorem ipsum dolor sit amet',
                'status' => 1,
                'created' => '2024-11-19 22:31:05',
                'modified' => '2024-11-19 22:31:05',
            ],
        ];
        parent::init();
    }
}
