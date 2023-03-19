export const MESSAGE_LOADING = "Подождите, идет загрузка...";
export const MESSAGE_ERROR = "Возникла ошибка при получении данных";

export function getEventMessage(e: Event) {
    if (e instanceof ErrorEvent) {
        return e.message;
    } else if (e instanceof CloseEvent) {
        return `${e.code} ${e.reason}`;
    }

    return `Ошибка ${e.type}: ${JSON.stringify(e, Object.getOwnPropertyNames(e))}`;
}
