import axios from "axios";
export default function PhotoUploader({setAddedPhotos}){
    
    async function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
    
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
    
        try {
            const response = await axios.post('http://localhost:4000/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            const { data: filenames } = response;
            setAddedPhotos((prev) => [...prev, ...filenames]);
            
        } catch (error) {
            console.error('Error uploading photos:', error);
        }
    }

    return (
    <>
    <h2 className="text-xl mt-4">Photos</h2>
                        
                        
                        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        
                        <label className="cursor-pointer border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">Upload
                            <input type="file" multiple name="photos" className="hidden" onChange={uploadPhoto}/>
                        </label>

                        </div>
    </>
    )
}