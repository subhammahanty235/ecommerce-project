import './homepage.scss';
import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';

const GET_ALL_ITEMS = gql`
query GetAllItems {
    getAllItems {
      id,
      itemName,
      itemDescription,
      price,
      totalStocks  ,
      totalsales
    }
  }  
`;

const ORDER_ITEM = gql`
mutation OrderItem($order: OrderItemInput!) {
    orderItem(order: $order) {
      user {
        email
      }
      item {
        itemName
      } 
    }
  }
`

const Homepage = () => {
    const { loading, error, data } = useQuery(GET_ALL_ITEMS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const [orderItem , {loadingdata , errordata}] = useMutation(ORDER_ITEM)

    const buyItem = async(itemid) =>{
        try {
            const {data} = await orderItem({
                variables:{
                    order:{
                        userId:localStorage.getItem("userId"),
                        itemId:itemid
                    }
                }
            })

            alert("Ordered Successfully")
        } catch (error) {
            alert(errordata)
        }
    }

    const items = data.getAllItems;

    return (
        <div className='homepage'>
            <h2>Homepage</h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.itemName}</td>
                            <td>{item.itemDescription}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>
                                <button onClick={() => buyItem(item.id)}>Buy Now</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Homepage;
