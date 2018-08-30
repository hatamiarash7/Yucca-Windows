<template>
	<v-list dense class="pt-0 transparent" dark>
		<v-list-tile v-for="item in items" :key="item.title" @click="item.action()">
			<v-list-tile-action>
				<v-icon>{{ item.icon }}</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title>{{ item.title }}</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
	</v-list>
</template>
<script>
import { ProjectsManager } from '../../../core/ProjectManager';

export default {
	name: 'ProjectSettings',
	data() {
		return {
			items: [
				{
					title: 'پروژه جدید',
					icon: 'add',
					action: () => this.$store.commit('CreateProjDialog')
				},
				{
					title: 'ذخیره کردن پروژه ها',
					icon: 'save',
					action: () => { this.$store.commit('ExportProjDialog') }
				},
				{
					title: 'وارد کردن پروژه ها',
					icon: 'insert_drive_file',
					action: () => { ProjectsManager.LoadProject(); }
				},
				// {
				// 	title: 'Upload Database',
				// 	icon: 'sync',
				// 	action: () => this.$store.dispatch('UploadGist')
				// },
				// {
				// 	title: 'Download Database',
				// 	icon: 'cloud_download',
				// 	action: () => this.$store.dispatch('DownloadGist')
				// },
				{
					title: 'تنظیمات',
					icon: 'settings',
					action: () => this.$store.commit('ShowSettings', true)
				},
			]
		}
	},
	computed: {

	},
	methods: {

	},
}
</script>

<style scoped>

</style>