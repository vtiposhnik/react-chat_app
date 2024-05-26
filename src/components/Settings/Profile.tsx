import { Button, Tooltip } from "flowbite-react";

export default function Profile() {
    return (
        <section className="w-[50%] p-4 flex flex-col items-center gap-4 text-center mx-auto">
            <form className="flex flex-col gap-2 items-center">
                <Tooltip content="Click to Upload a profile image">
                    <label htmlFor='image' className="cursor-pointer">
                        <img src="/user-pfp.png" alt="" className="size-[100px]" />
                    </label>
                </Tooltip>
                <input id="image" className="hidden" type="file" />
                <label htmlFor="">Ваше полное имя: </label>
                <input type="text" />
                <label htmlFor="">О себе: </label>
                <input type="text" />
                <label htmlFor="">Номер телефона: </label>
                <input type="text" />
            </form>
            <Button>
                Выйти из аккаунта
            </Button>
        </section>
    )
}
