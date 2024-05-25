import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { Button, Spinner } from "flowbite-react";

export default function Register({ loading, setUrl, submitHandler }: { loading: boolean, setUrl: React.Dispatch<React.SetStateAction<string | null>>, submitHandler: (e: React.FormEvent<HTMLFormElement>) => void }) {
    const [progress, setProgress] = useState(0)

    const [img, setImg] = useState<{ file: File | null, url: string }>({
        file: null,
        url: ''
    })
    const uploadImg = async () => {
        const storageRef = ref(storage, 'pfp/' + img.file!.name);
        const uploadTask = uploadBytesResumable(storageRef, img.file!);

        try {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    setProgress(progress)
                },
                (error) => {
                    console.error("Something went wrong!" + error.code);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUrl(downloadURL)
                        console.log('File available at', downloadURL, "PROGRESS IS ON", progress);
                    });
                }
            );
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        if (img.file) {
            uploadImg();
        }
    }, [img.file]);

    function handleUpload(e: React.ChangeEvent<HTMLInputElement>): void {
        console.log(img);
        if (e.target.files) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            });
        }
        uploadImg()

    }

    return (
        <section className="h-[90vh] w-[90vw] p-4 rounded-lg bg-slate-200 text-center">
            <form className="lg:w-[40%] p-8 mx-auto flex flex-col gap-4 border-gray-600 border rounded-lg" onSubmit={submitHandler}>
                <div className="flex flex-col items-center">
                    <label htmlFor="file" className="cursor-pointer relative">
                        <img src={`${img.url || '/user-pfp.png'}`} alt="upload an image" className="size-[100px] mx-auto rounded-full object-cover border-2 border-slate-600" />
                        Upload your profile image
                    </label>
                    <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        onChange={handleUpload}
                    />
                </div>

                <label htmlFor="username">Email:</label>
                <input name="email" id="username" type="text" className="w-full p-2 rounded-lg" placeholder="Your email..." />
                <label htmlFor="username">Username</label>
                <input name="username" id="username" type="text" className="w-full p-2 rounded-lg" placeholder="Your username..." />
                <label htmlFor="password">Password</label>
                <input name="password" id="password" type="text" className="w-full p-2 rounded-lg" placeholder="Your password..." />
                <Button
                    gradientDuoTone='purpleToPink'
                    type='submit'
                    size='lg'
                    disabled={loading}
                    className="mx-auto"
                >
                    {loading ? (
                        <>
                            <Spinner size='sm' />
                            <span className='pl-3'>Loading...</span>
                        </>
                    ) : (
                        'Sign In'
                    )}
                </Button>
                <span>Already have an account? <Link to='/?tab=login'>Sign In</Link></span>
            </form>
        </section>

    )
}
