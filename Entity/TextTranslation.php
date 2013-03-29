<?php

namespace Egzakt\SystemBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\ExecutionContext;

use Egzakt\SystemBundle\Lib\BaseTranslationEntity;

/**
 * TextTranslation
 */
class TextTranslation extends BaseTranslationEntity
{
    /**
     * @var integer $id
     */
    protected $id;

    /**
     * @var string $locale
     */
    protected $locale;

    /**
     * @var string $text
     */
    protected $text;

    /**
     * @var string $name
     */
    protected $name;

    /**
     * @var string $anchor
     */
    protected $anchor;

    /**
     * @var boolean $active
     */
    protected $active;

    /**
     * @var Text
     */
    protected $translatable;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set locale
     *
     * @param string $locale
     */
    public function setLocale($locale)
    {
        $this->locale = $locale;
    }

    /**
     * Get locale
     *
     * @return string
     */
    public function getLocale()
    {
        return $this->locale;
    }

    /**
     * Set text
     *
     * @param text $text
     */
    public function setText($text)
    {
        $this->text = $text;
    }

    /**
     * Get text
     *
     * @return text
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Set name
     *
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set anchor
     *
     * @param string $anchor
     */
    public function setAnchor($anchor)
    {
        $this->anchor = $anchor;
    }

    /**
     * Get anchor
     *
     * @return string
     */
    public function getAnchor()
    {
        return $this->anchor;
    }

    /**
     * Set active
     *
     * @param boolean $active
     */
    public function setActive($active)
    {
        $this->active = $active;
    }

    /**
     * Get active
     *
     * @return boolean
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * Set translatable
     *
     * @param Text $translatable
     */
    public function setTranslatable(Text $translatable)
    {
        $this->translatable = $translatable;
    }

    /**
     * Get translatable
     *
     * @return Text
     */
    public function getTranslatable()
    {
        return $this->translatable;
    }

    /**
     * Validate the sub-fields of a collapsable text
     *
     * @param ExecutionContext $context The Execution Context
     */
    public function isCollapsableValid(ExecutionContext $context)
    {
        if ($this->translatable->getCollapsable()) {

            // Validate presence of name
            if (false == $this->getName()) {

                $propertyPath = $context->getPropertyPath() . '.name';
                $context->setPropertyPath($propertyPath);
                $context->addViolation('A collapsable text must have a name', array(), null);
            }
        }
    }
}