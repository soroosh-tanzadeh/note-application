<template>
	<div class="material-textfield">
		<input :type="type" :required="required" :placeholder="inputPlaceholder ? inputPlaceholder : ' '" :class="[inputClass, { invalid: invalid }]" @blur="check" @focus="onFocus" @input="input" v-model="val" :maxlength="maxlength" class="input" />
		<label v-if="placeholder !== undefined">{{ placeholder }}</label>
		<slot></slot>
	</div>
</template>

<script>
export default {
	methods: {
		input() {
			this.$emit("update:modelValue", this.val);
		},
		onFocus() {
			this.$emit("focus");
			this.focus = true;
		},
		check() {
			this.$emit("blur");
			this.focus = false;
		},
	},
	created() {
		this.val = this.value;
	},
	watch: {
		value() {
			this.val = this.value;
		},
	},
	data() {
		return {
			val: "",
			focus: false,
		};
	},
	props: {
		invalid: {
			type: Boolean,
			default: false,
			required: false,
		},
		value: {
			type: String,
			default: "",
			required: false,
		},
		required: {
			type: Boolean,
			default: false,
			required: false,
		},
		type: {
			type: String,
			default: "text",
			required: false,
		},
		maxlength: {
			type: [Number, String],
			default: 15000,
			required: false,
		},
		inputPlaceholder: {
			type: String,
			default: undefined,
			required: false,
		},
		inputClass: {
			type: String,
			default: "",
			required: false,
		},
		placeholder: {
			type: String,
			default: undefined,
			required: false,
		},
	},
};
</script>
