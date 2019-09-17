<template>
  <div class="title-bar">
    <!-- <icon :icon="infoSvg" style="height= 12px;" /> -->

    <span class="title ml-1">Andrews Admin</span>

    <span class="separator" />

    <!-- <transition name="fade">
      <a v-if="!anilistOnline" class="alert" href="http://status.anilist.co/">
        It seems like AniList is down, most features will not work.
        <icon :icon="infoSvg" />
      </a>
    </transition>-->

    <span v-if="!isMac" class="menu-buttons">
      <icon class="button" :icon="minimizeSvg" @click.native="minimize" />
      <icon class="close" :icon="closeSvg" @click.native="close" />
    </span>
    <span v-else class="menu-buttons mac">
      <span class="close" @click="close" />
      <span class="minimize" @click="minimize" />
      <span class="maximize" />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { activeWindow, is } from "electron-util";
// import gql from 'graphql-tag'
// import { oc } from 'ts-optchain'
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiClose,
  mdiInformationOutline,
  mdiMinus
} from "@mdi/js";

// import { closeAllModals } from '@/state/app'
// import { getCrunchyrollCountry, getIsConnectedTo } from '@/state/auth'
// import { Query } from '@/decorators'

import Icon from "./Icon.vue";
import { version } from "../../package.json";

// const flagContext = require.context('svg-country-flags/svg')

@Component<TitleBar>({ components: { Icon } })
export default class TitleBar extends Vue {
  //   @Query({
  //     fetchPolicy: 'no-cache',
  //     query: gql`
  //       {
  //         Viewer {
  //           id
  //         }
  //       }
  //     `,
  //     variables: null,
  //     skip() {
  //       return !this.isConnectedTo.anilist
  //     },
  //     // update(data) {
  //     //   return oc(data).Viewer.id() != null
  //     // },
  //     error() {
  //       return false
  //     },
  //     errorPolicy: 'all',
  //     pollInterval: 60 * 1000,
  //   })
  public anilistOnline = true;

  public backSvg = mdiChevronLeft;
  public forwardSvg = mdiChevronRight;
  public infoSvg = mdiInformationOutline;
  public minimizeSvg = mdiMinus;
  public closeSvg = mdiClose;

  public get name() {
    const shouldUseSillyName = Math.random() <= 0.1;
    if (!shouldUseSillyName) return "Yuna";

    return ["Yummy", "(○^ω^)_旦 "][Math.round(Math.random())];
  }

  public get flag() {
    let flagSvg: any = null;

    return flagSvg;
  }

  private restrictedViews = [/login/, /first-time-setup/];
  public get isOnRestrictedView(): boolean {
    return this.restrictedViews.some(
      view => view.exec(this.$route.path) != null
    );
  }

  public get isMac() {
    return is.macos;
  }

  public minimize() {
    activeWindow().minimize();
  }

  public close() {
    activeWindow().close();
  }

  public goBack() {
    if (this.isOnRestrictedView) return;

    history.back();
  }

  public goForward() {
    if (this.isOnRestrictedView) return;

    history.forward();
  }
}
</script>

<style lang="scss">
@import "../colors";
.myCon {
  height: 10px;
  font-size: 12;
}
.title-bar {
  position: relative;
  // padding: 4px;
  display: flex;
  min-width: 100%;
  color: $white;
  align-items: center;
  width: 100%;
  height: 26px;
  flex-shrink: 0;
  background: $background;
  user-select: none;
  cursor: default !important;
  -webkit-app-region: drag;
  z-index: 100;

  & > * {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  & > .nav-button {
    order: 1;
    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;

    transition: background 0.15s;

    &:hover {
      background: rgba(150, 150, 150, 0.05);
    }

    &:active {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  & > .title {
    order: 2;
    // padding-left: 3px;
  }

  & > .flag {
    order: 3;
    height: 100%;
    margin-left: 10px;
    -webkit-app-region: no-drag;

    & > svg {
      height: 12px;
    }
  }

  & > .separator {
    order: 4;
    flex-shrink: 1;
    width: 100%;
  }

  & > .alert {
    order: 5;
    color: $danger;
    font-weight: 600;
    font-size: 0.85em;
    -webkit-app-region: no-drag;

    & > .icon {
      fill: $danger;
      padding: 6px;
    }
  }

  & .icon {
    fill: $white;
    height: 30px;
    padding: 2px;
    width: 35px;
    -webkit-app-region: no-drag;
    transition: background 75ms;

    &.button:hover {
      background: rgba(150, 150, 200, 0.1);
    }
  }

  & > .menu-buttons {
    order: 10;

    & > .close:hover {
      background: $oxford-blue;
    }

    &.mac {
      order: 0;
      display: flex;
      align-items: center;
      margin-left: 12px;

      & > span {
        border-radius: 100%;
        height: 12px;
        width: 12px;
        margin-right: 8px;
        -webkit-app-region: no-drag;

        &.close {
          background: #ff6058;
          border: 1px solid darken(#ff6058, 8%);
        }
        &.minimize {
          background: #ffbd30;
          border: 1px solid darken(#ffbd30, 8%);
        }
        &.maximize {
          background: gray;
          border: 1px solid darken(gray, 8%);
        }
      }
    }
  }
}
</style>
