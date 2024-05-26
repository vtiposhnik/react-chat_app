import { Button, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Login({ loading, submitHandler }: { loading: boolean, submitHandler: (e: React.FormEvent<HTMLFormElement>) => void }) {
    return (
        <section className="h-[90vh] w-[90vw] p-4 rounded-lg bg-slate-200 text-center">
            <form className="lg:w-[40%] p-8 mx-auto flex flex-col gap-4 border-gray-600 border rounded-lg" onSubmit={submitHandler}>
                <label htmlFor="username">Электронная почта:</label>
                <input name="email" type="text" className="w-full p-2 rounded-lg" placeholder="Ваша почта..." />

                <label htmlFor="password">Пароль:</label>
                <input name="password" type="text" className="w-full p-2 rounded-lg" placeholder="Ваш пароль..." />

                <Button
                    gradientDuoTone='purpleToPink'
                    type='submit'
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Spinner size='sm' />
                            <span className='pl-3'>Загрузка...</span>
                        </>
                    ) : (
                        'Войти'
                    )}
                </Button>
                <span>Не авторизованы? <Link to='/?tab=register'>Создайте аккаунт</Link></span>
            </form>
        </section>
    )
}
