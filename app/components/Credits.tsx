export default function Credits() {
    return (
        <div className="flex flex-col items-center gap-8 px-6 py-4 opacity-60 border-t-2">
            <img
                className="w-full"
                src="/logos/udea.png"
                alt="Universidad de Antioquia"
            />
            <img
                className="w-full"
                src="/logos/uab.png"
                alt="Universidad autonóma de Barcelona"
            />

            <div className="flex items-center gap-2">
                <img className="h-6" src="/logos/github.png" alt="Github" />
                <p className="flex-grow">rdzPedraos</p>
            </div>
        </div>
    );
}
