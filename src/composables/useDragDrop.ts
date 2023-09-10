import { findColumn, findTaskIndex } from "@/helper";
import { useStore } from "@/stores/store";
import { ColumnType, type ITask } from "@/types";
import { VueElement, ref } from 'vue';

export const useDragDrop = () => {
    const { board } = useStore();

    const dragItem = ref<ITask>();
    const columnFrom = ref<ColumnType>(ColumnType.Pending)
    const columnTo = ref<ColumnType>(ColumnType.Pending)
    const isDragging = ref<boolean>(false)
    const taskElements = ref<VueElement[]>([])
    const placeHolderIndex = ref<number>(0);

    const onDragStart = (ev: DragEvent) => {
        console.log("drag started...!!")
        const el = (ev.target as HTMLElement);
        const taskIndex = +(el.getAttribute("data-index") as any)
        columnFrom.value = findColumn(el);
        isDragging.value = true;
        dragItem.value = board[columnFrom.value as ColumnType][taskIndex];
    }
    const onDragEnd = (ev: DragEvent) => {
        console.log("drag ends...!!")
        isDragging.value = false;

        // console.log(columnFrom.value, columnTo.value, dragItem.value?.title)
        console.log(placeHolderIndex.value)
        board[columnTo.value].splice(placeHolderIndex.value, 1, dragItem.value as any)

    }


    const onDrag = (ev: DragEvent) => {
        const el = (ev.target as HTMLElement);
        el.classList.add('v-speed-dial')
    }


    const onDragOver = (ev: DragEvent) => {
        ev.preventDefault()
        const el = (ev.target as HTMLElement);
        columnTo.value = findColumn(el);
        const nearTaskIndex = findTaskIndex(el)

        // remove placeholder from all column
        for (let column in board) {
            board[column as ColumnType] = board[column as ColumnType].filter((item: ITask) => !item.isPlaceholder)
        }

        board[columnFrom.value] = board[columnFrom.value].filter((item: ITask) => item.id !== dragItem.value?.id)

        const placeHolderItem = { isPlaceholder: true } as any
        if (board[columnTo.value].length) {
            board[columnTo.value].splice(nearTaskIndex, 0, placeHolderItem)
        } else {
            board[columnTo.value].push(placeHolderItem)
        }
        placeHolderIndex.value = nearTaskIndex;
    }

    const highlightDragItem = (item: ITask) => {
        return item.isPlaceholder ? 'bg-placeholder' : 'bg-task'
    }


    return {
        onDragStart,
        onDragEnd,
        onDrag,
        onDragOver,
        highlightDragItem
    }

}