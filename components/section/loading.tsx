const Loading = () => {
  return (
    <div className="fixed inset-0 grid place-items-center">
      <div className='grid place-items-center gap-10'>
        <div className="w-14 h-14 animate-spin">
          <img
            src="\images\loading.png"
            alt="loading"
            className="w-full h-full"
          />
        </div>

        <div className="grid gap-3 text-center">
          <h1 className="font-bold text-lg">Barangay Victoria Reyes</h1>
          <h2>Management System</h2>
        </div>
      </div>
    </div>
  )
}

export default Loading
