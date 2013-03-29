<?php

namespace Egzakt\SystemBundle\Lib;

use Doctrine\ORM\Mapping as ORM;

/**
 * Egzakt Backend Base for Translation Entities
 */
abstract class BaseTranslationEntity
{

    /**
     * __toString
     *
     * @return string
     */
    public function __toString()
    {
        if ($this->getId()) {
            if (method_exists($this, 'getName')) {
                return $this->getName() ? $this->getName() : 'Untitled';
            }

            // DEPRECATED
            if (method_exists($this, 'getNom')) {
                return $this->getNom() ? $this->getNom() : 'Untitled';
            }

            return $this->getEntityName();
        }

        if (!$this->translatable->getId()) {
            return 'New ' . $this->translatable->getEntityName();
        }

        return '';
    }

    /**
     * Returns the entity name without its path
     *
     * @return string
     */
    public function getEntityName()
    {
        $className = get_class($this);
        $classNameTokens = explode('\\', $className);
        return array_pop($classNameTokens);
    }
}