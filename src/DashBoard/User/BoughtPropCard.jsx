const BoughtPropCard = ({ prop }) => {

    const { image, title, agent, status, location, amount } = prop;
    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image} />
                        </div>
                    </div>

                </div>
            </td>
            <td>
                <div className="font-bold">{title}</div>
            </td>
            <td>
                <div className="text-sm opacity-50">{location}</div>
            </td>
            <td>{agent.name}</td>
            <td>${amount}</td>
            <td>{status}</td>
            <th>
                {
                    (status === 'accepted') ?
                        <button className="btn bg-green-600 hover:bg-green-400 text-white">Pay</button>
                        :
                        <></>
                }
            </th>
        </tr>
    );
};

export default BoughtPropCard;