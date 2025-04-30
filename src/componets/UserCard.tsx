
import "./user_card_style.css"
interface UserProps{
    firtName : string;
    lastName : string;
    age : number;
    job : string;
}
const UserCard :  React.FC<UserProps> = ({firtName , lastName , age , job} : UserProps) => {


    return (
        <div className="user-card">
            <p className="user-card-title">{firtName} {lastName}</p>
            <p className="user-card-text"><strong>Age:</strong>{age}</p>
            <p className="user-card-text"><strong>Job:</strong>{job}</p>
        </div>
    );

}

export default UserCard;