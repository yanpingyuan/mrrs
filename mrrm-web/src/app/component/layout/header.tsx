export default function Header() {

return (<>
        <div>
            <div className="flex justify-between items-center p-4">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold">Mrrm Dashboard</h1>
                </div>
                <div className="flex items-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Login</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
                </div>
            </div>
        </div>
    </>)
}