<template>
  <div class="polestar-tag">
    <!--<span class="polestar-tagSelector&#45;&#45;label" :style="{width: labelWidth + 'px'}">{{label}}</span>-->
    <!--<span-->
      <!--v-for="tagSelector in tagList"-->
      <!--:key="tagSelector[keySet.valueKey]"-->
      <!--:class="['polestar-tagSelector&#45;&#45;item', 'mr5', tagClass, selectedTagId === tagSelector[keySet.valueKey] ? activeTagClass : '']"-->
      <!--@click="tagClick(tagSelector)">{{tagSelector[keySet.labelKey]}}</span>-->
    <div class="polestar-tag--label" :style="{width: labelWidth + 'px'}">{{label}}</div>
    <div class="polestar-tags">
      <span
        v-for="tag in tagList"
        :key="tag[keySet.valueKey]"
        :class="['polestar-tagSelector--item', 'mr5', tagClass, selectedTagId === tag[keySet.valueKey] ? activeTagClass : '']"
        @click="tagClick(tag)">{{tag[keySet.labelKey]}}</span>
    </div>
  </div>
</template>

<script>
/**
 * @prop label 标题
 * @prop labelWidth 标题长度
 * @prop tagList 标签列表
 * @prop activeTagClass 激活tag的样式
 * @prop tagClass tag的样式
 * @prop keySet.valueKey 绑定值的key
 * @prop keySet.labelKey 展示值的key
 * @action tagClick 点击回调
 * @action change 改变回调
 */
export default {
  name: 'plTagSelector',
  props: {
    label: {
      type: String
    },
    tagList: {
      type: Array,
      default: () => {
        return []
      }
    },
    keySet: {
      type: Object,
      default: () => {
        return {
          valueKey: 'value',
          labelKey: 'label'
        }
      }
    },
    tagClass: {
      type: String
    },
    activeTagClass: {
      type: String,
      default: 'polestar-tagSelector--item__active'
    },
    labelWidth: {
      type: Number,
      default: 60
    },
    value: {}
  },
  data () {
    return {
      selectedTag: {},
      selectedTagId: ''
    }
  },
  mounted () {
    this.selectedTagId = this.value
  },
  methods: {
    tagClick (tag) {
      this.$emit('tagClick', tag)
      if (this.selectedTag !== tag) {
        this.selectedTag = tag
        this.selectedTagId = tag[this.keySet.valueKey]
        this.$emit('input', this.selectedTagId)
        this.$emit('change', tag)
      }
    }
  },
  watch: {
    value (id) {
      this.selectedTagId = id
      let selected = this.tagList.filter(v => v[this.keySet.valueKey] === id)
      if (selected.length > 0) {
        this.selectedTag = selected[0]
      } else {
        this.selectedTag = {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .polestar-tag {
    display: flex;
  }

  .polestar-tag--label {
    width: 70px;
    text-align: left;
    display: inline-block;
    padding-top: 8px;
    line-height: 1;
    /*flex: 0;*/
  }
  .polestar-tags{
    flex: 1;
  }
  .polestar-tag--item{
    line-height: 1;
    padding: 8px 10px;
    display: inline-block;
    cursor: pointer;
    &.polestar-tag--item__active{
      background-color: #1890FF;
      color: #fff;
      border-radius: 4px;
    }
  }
</style>
