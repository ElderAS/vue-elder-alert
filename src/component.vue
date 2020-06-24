<template>
  <div class="alert" :class="classes" role="alert">
    <div class="alert__content">
      <FontAwesomeIcon v-if="iconComp" v-bind="iconComp" class="alert__icon" />
      <span>
        <slot />
      </span>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Options } from '../index'
import { iconBinding } from './utils'
import './icons'

export default {
  props: {
    theme: {
      type: String,
      enum: ['primary', 'secondary', 'warning', 'error', 'success'],
      default: 'primary',
    },
    iconPlacement: {
      type: String,
      enum: ['right', 'left'],
      default: 'right',
    },
    icon: [Array, Boolean],
  },
  computed: {
    classes() {
      return ['alert--' + this.theme, 'alert--icon-' + this.iconPlacement]
    },
    iconComp() {
      return iconBinding(this.icon || Options.icons[this.theme])
    },
  },
  components: {
    FontAwesomeIcon,
  },
}
</script>

<style lang="scss">
@import './main.scss';

:root {
  @include GenerateVariables();
}

.alert {
  $spacing: 1.2rem;

  position: relative;
  border-radius: GetVariable('border-radius');
  background-color: white;

  font-size: 0.8em;

  &--icon-right {
    .alert__content {
      flex-direction: row-reverse;
      justify-content: space-between;
    }
  }

  &__content {
    position: relative;
    display: flex;
    align-items: center;
    font-weight: 300;
    line-height: 1.52;
    padding: $spacing;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.1;
    }
  }

  @each $state in $states {
    &--#{nth($state, 1)} {
      .alert__content {
        color: GetVariable(nth($state, 1));

        &:before {
          background-color: GetVariable(nth($state, 1)) !important;
        }
      }
    }
  }

  &__icon {
    margin: 0 $spacing 0 0;

    .alert--icon-right & {
      margin: 0 0 0 $spacing;
    }
  }
}
</style>
