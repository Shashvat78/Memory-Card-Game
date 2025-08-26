function Card({name,image,onClick}){
    return(<div className="p-4 border rounded-xl shadow hover:scale-105 transition cursor-pointer" onClick={onClick}>
        <img src={image} alt={name} className="w-24 h-24 object-contain mx-auto"></img>
        <p className="text-center mt-2">{name}</p>
    </div>);

}

export default Card