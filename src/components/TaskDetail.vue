<script lang="ts" setup>
import { useStore } from '@/stores/store';
import type { ITask } from '@/types';
import { ref } from 'vue';
import moment from "moment"

const props = defineProps<{ selectedTask: ITask }>()
const { tagsColorMap } = useStore()

const comments = ref<{ text: string; author: string }[]>([
    { text: 'This is the first comment.', author: 'User A' },
    { text: 'Here is another comment.', author: 'User B' },
    { text: 'A third comment goes here.', author: 'User C' },
    // Add more sample comments as needed
]);

const commentBox = ref<string>("");
const addComment = () => {
    if (commentBox.value) {
        comments.value.push({ text: commentBox.value, author: 'John Doe' });
    }
}

</script>
<template>
    <VCard>
        <VCardTitle>Task Detail</VCardTitle>
        <VDivider></VDivider>
        <VCardItem>
            <VContainer>
                <VRow>
                    <VCol cols="12" sm="6">
                        <strong>Title</strong>
                        <p class="mb-2">{{ selectedTask?.title }}</p>
                        <strong>Description</strong>
                        <p class="mb-2" style="height: 300px; overflow-y: scroll;">{{ selectedTask?.description }}</p>
                        <strong>Estimated Time</strong>
                        <div class="mb-2">
                            {{ moment(selectedTask?.estimatedDate).format("YYYY/MM/DD") }} {{
                                selectedTask?.estimatedTime }}
                        </div>
                        <strong>Labels</strong>
                        <div class="mb-2">
                            <VChip class="mr-2" v-for="(tag, i) in selectedTask?.tags" :color="tagsColorMap[tag]" :key="i">
                                <VIcon icon="fa fa-tag" class="mr-2" size="16"></VIcon>
                                {{ tag }}
                            </VChip>
                        </div>
                    </VCol>
                    <VCol cols="12" sm="6">
                        <VCarousel
                            v-if="selectedTask && selectedTask.fileThumbnails && selectedTask?.fileThumbnails?.length">
                            <VCarouselItem v-for="(img, i) in selectedTask?.fileThumbnails" :key="i">
                                <VImg :src="img.src" aspect-ratio="4/3" hide-delimiters> </VImg>
                            </VCarouselItem>
                        </VCarousel>
                        <div v-else border class="flex justify-center align-center">
                            <div>
                                No Attachments Found
                            </div>
                        </div>
                    </VCol>
                </VRow>
            </VContainer>

        </VCardItem>
        <VCardItem>
            <v-card class="pa-2" border>
                <v-card-title>Comments</v-card-title>
                <div class="mb-2">
                    <VTextarea v-model="commentBox" label="Add Comment"></VTextarea>
                    <div class=" flex justify-end">
                        <VBtn class="mb-2 mr-1" @click="addComment">Add Comment</VBtn>
                    </div>
                </div>
                <div>
                    <template v-for="(comment, index) in comments" :key="index">
                        <div class="flex align-center mb-4">
                            <VAvatar color="blue" class="mr-2">
                                <VIcon icon="fa fa-user"></VIcon>
                            </VAvatar>
                            <div>
                                <strong class="">{{ comment.author }}</strong>
                                <div>{{ comment.text }}</div>
                            </div>
                        </div>
                    </template>
                </div>
            </v-card>
        </VCardItem>
        <VCardActions>

        </VCardActions>
    </VCard>
</template>
