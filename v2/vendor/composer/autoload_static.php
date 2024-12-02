<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit338a2c85b3c4e5c1b7893dfd10991562
{
    public static $prefixLengthsPsr4 = array (
        'W' => 
        array (
            'WPTableBuilder\\' => 15,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'WPTableBuilder\\' => 
        array (
            0 => __DIR__ . '/../..' . '/inc',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit338a2c85b3c4e5c1b7893dfd10991562::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit338a2c85b3c4e5c1b7893dfd10991562::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit338a2c85b3c4e5c1b7893dfd10991562::$classMap;

        }, null, ClassLoader::class);
    }
}
