export default function FeatureCard({image,title,desc})
{
    return (
        <div className=" bg-white rounded-xl shadow-xl w-[270px] py-4 flex items-center">
            <img src={image}
            alt="Image not found"
            className="w-33 h-14"/>
            <div>
                <div className="text-blue-900 font-bold tracking-wide text-[18px] ">{title} </div>
                <h3 className="text-[15px]"> {desc}</h3>
            </div>
        </div>
    )
}