<?php

namespace Unifik\SystemBundle\Entity;

/**
 * SectionModule
 */
class SectionModule
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $controller;

    /**
     * @var integer
     */
    private $ordering;

    /**
     * @var \Unifik\SystemBundle\Entity\Section
     */
    private $section;

    /**
     * @var \Unifik\SystemBundle\Entity\App
     */
    private $app;

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
     * Set controller
     *
     * @param  string        $controller
     * @return SectionModule
     */
    public function setController($controller)
    {
        $this->controller = $controller;

        return $this;
    }

    /**
     * Get controller
     *
     * @return string
     */
    public function getController()
    {
        return $this->controller;
    }

    /**
     * Set ordering
     *
     * @param  integer       $ordering
     * @return SectionModule
     */
    public function setOrdering($ordering)
    {
        $this->ordering = $ordering;

        return $this;
    }

    /**
     * Get ordering
     *
     * @return integer
     */
    public function getOrdering()
    {
        return $this->ordering;
    }

    /**
     * Set section
     *
     * @param  \Unifik\SystemBundle\Entity\Section $section
     * @return SectionModule
     */
    public function setSection(\Unifik\SystemBundle\Entity\Section $section = null)
    {
        $this->section = $section;

        return $this;
    }

    /**
     * Get section
     *
     * @return \Unifik\SystemBundle\Entity\Section
     */
    public function getSection()
    {
        return $this->section;
    }

    /**
     * Set app
     *
     * @param  \Unifik\SystemBundle\Entity\App $app
     * @return SectionModule
     */
    public function setApp(\Unifik\SystemBundle\Entity\App $app = null)
    {
        $this->app = $app;

        return $this;
    }

    /**
     * Get app
     *
     * @return \Unifik\SystemBundle\Entity\App
     */
    public function getApp()
    {
        return $this->app;
    }
    /**
     * @var \Unifik\SystemBundle\Entity\Navigation
     */
    private $navigation;

    /**
     * Set navigation
     *
     * @param  \Unifik\SystemBundle\Entity\Navigation $navigation
     * @return SectionModule
     */
    public function setNavigation(\Unifik\SystemBundle\Entity\Navigation $navigation = null)
    {
        $this->navigation = $navigation;

        return $this;
    }

    /**
     * Get navigation
     *
     * @return \Unifik\SystemBundle\Entity\Navigation
     */
    public function getNavigation()
    {
        return $this->navigation;
    }
    /**
     * @var string
     */
    private $target;

    /**
     * Set target
     *
     * @param  string        $target
     * @return SectionModule
     */
    public function setTarget($target)
    {
        $this->target = $target;

        return $this;
    }

    /**
     * Get target
     *
     * @return string
     */
    public function getTarget()
    {
        return $this->target;
    }
    /**
     * @var string
     */
    private $type;

    /**
     * Set type
     *
     * @param  string        $type
     * @return SectionModule
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }
}
