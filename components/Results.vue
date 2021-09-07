<template>
  <div class="results">
    <div class="results__wrapper" v-if="image">
      <div class="results__preview">
        <v-img :src="image" alt />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.results {
  &__wrapper {
    display: flex;
    position: absolute;
    right: 15px;
    bottom: 15px;
    border: dashed 1px rgba(white, 0.5);
  }

  &__preview {
    width: 107px;
    height: 100%;
    opacity: 0.8;
    pointer-events: none;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<script>
export default {
  props: {
    coordinates: {
      type: Object,
      default() {
        return {};
      }
    },
    image: {
      type: String
    }
  }
};
</script>
