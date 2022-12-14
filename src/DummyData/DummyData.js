import profile2 from "../assets/images/profile1.png";
import profile3 from "../assets/images/profile3.png";
import profile4 from "../assets/images/profile4.png";
import {
  default as profile1,
  default as profile5
} from "../assets/images/profile5.png";

//Use for Fake All Devices- Info
export const allDevicesInfo = [
  {
    id: 1,
    name: "IMPORT190",
    licence_plate: "AA 1278",
    status: "active",
    colour: "Black",
    vahicle_type: "truck",
    capacity: {
      l: 300,
      w: 200,
      h: 300,
    },
    driver: "peter parker",
  },
  {
    id: 2,
    name: "IMPORT190",
    licence_plate: "AA 1278",
    status: "deactive",
    colour: "Black",
    vahicle_type: "truck",
    capacity: {
      l: 300,
      w: 200,
      h: 300,
    },
    driver: "peter parker",
  },
  {
    id: 3,
    name: "IMPORT190",
    licence_plate: "AA 1278",
    status: "active",
    colour: "Black",
    vahicle_type: "truck",
    capacity: {
      l: 300,
      w: 200,
      h: 300,
    },
    driver: "peter parker",
  },
  {
    id: 4,
    name: "IMPORT190",
    licence_plate: "AA 1278",
    status: "active",
    colour: "Black",
    vahicle_type: "truck",
    capacity: {
      l: 300,
      w: 200,
      h: 300,
    },
    driver: "peter parker",
  },
];

//Use for Fake All Drivers- Info
export const CustomersInfo = [
  {
    id: 1,
    profile_img: profile1,
    type: 'Customer',
    online_status: "active",
    first_name: "Peter",
    last_name: "Parker",
    phone: "+8 7784500150",
    email: "home@gmail.com",
    address: {
      street: "1890 Popular Avenue",
      country: "United Status",
      state: "Alaska",
      city: "San Diego",
      postalcode_zip: 92012,
    },
    documents: null,
    rating: 5.0,
    active_orders: {
      status: "active",
      orders: [
        {
          id: 1,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "John Doe",
          order_status: "processing",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
        {
          id: 2,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "Watson ",
          order_status: "completed",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
      ],
    },
  },
  {
    id: 2,
    profile_img: profile2,
    type: 'Customer',
    online_status: "active",
    first_name: "John",
    last_name: "Doe",
    phone: "+8 7784500150",
    email: "khan@gmail.com",
    address: {
      street: "1890 Popular Avenue",
      country: "United Status",
      state: "Alaska",
      city: "San Diego",
      postalcode_zip: 92012,
    },
    documents: null,
    rating: 4.5,
    active_orders: {
      status: "active",
      orders: [
        {
          id: 1,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "John Doe",
          order_status: "processing",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
        {
          id: 2,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "Watson ",
          order_status: "completed",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
      ],
    },
  },
  {
    id: 3,
    profile_img: profile5,
    type: 'Customer',
    online_status: "inactive",
    first_name: "Dan",
    last_name: "Parker",
    phone: "+8 7784500150",
    email: "peter@gmail.com",
    address: {
      street: "1890 Popular Avenue",
      country: "United Status",
      state: "Alaska",
      city: "San Diego",
      postalcode_zip: 92012,
    },
    documents: null,
    rating: 1.0,
    active_orders: {
      status: "active",
      orders: [
        {
          id: 1,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "John Doe",
          order_status: "processing",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
        {
          id: 2,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "Watson ",
          order_status: "completed",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
      ],
    },
  },
  {
    id: 4,
    profile_img: profile3,
    type: 'Customer',
    online_status: "active",
    first_name: "Peter",
    last_name: "Parker",
    phone: "+8 7784500150",
    email: "sams@gmail.com",
    address: {
      street: "1890 Popular Avenue",
      country: "United Status",
      state: "Alaska",
      city: "San Diego",
      postalcode_zip: 92012,
    },
    documents: null,
    rating: 2.0,
    active_orders: {
      status: "active",
      orders: [
        {
          id: 1,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "John Doe",
          order_status: "processing",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
        {
          id: 2,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "Watson ",
          order_status: "completed",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
      ],
    },
  },
  {
    id: 5,
    profile_img: profile4,
    type: 'Customer',
    online_status: "inactive",
    first_name: "Peter",
    last_name: "Parker",
    phone: "+8 7784500150",
    email: "other@gmail.com",
    address: {
      street: "1890 Popular Avenue",
      country: "United Status",
      state: "Alaska",
      city: "San Diego",
      postalcode_zip: 92012,
    },
    documents: null,
    rating: 3.0,
    active_orders: {
      status: "active",
      orders: [
        {
          id: 1,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "John Doe",
          order_status: "processing",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
        {
          id: 2,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "Watson ",
          order_status: "completed",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
      ],
    },
  },
  {
    id: 6,
    profile_img: profile4,
    type: 'Customer',
    online_status: "inactive",
    first_name: "Peter",
    last_name: "Parker",
    phone: "+8 7784500150",
    email: "johndoe@gmail.com",
    address: {
      street: "1890 Popular Avenue",
      country: "United Status",
      state: "Alaska",
      city: "San Diego",
      postalcode_zip: 92012,
    },
    documents: null,
    rating: 3.0,
    active_orders: {
      status: "active",
      orders: [
        {
          id: 1,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "John Doe",
          order_status: "processing",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
        {
          id: 2,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "Watson ",
          order_status: "completed",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
      ],
    },
  },
  {
    id: 7,
    profile_img: profile4,
    type: 'Customer',
    online_status: "inactive",
    first_name: "Peter",
    last_name: "Parker",
    phone: "+8 7784500150",
    email: "hass@gmail.com",
    address: {
      street: "1890 Popular Avenue",
      country: "United Status",
      state: "Alaska",
      city: "San Diego",
      postalcode_zip: 92012,
    },
    documents: null,
    rating: 3.0,
    active_orders: {
      status: "active",
      orders: [
        {
          id: 1,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "John Doe",
          order_status: "processing",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
        {
          id: 2,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "Watson ",
          order_status: "completed",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
      ],
    },
  },
  {
    id: 8,
    profile_img: profile4,
    type: 'Customer',
    online_status: "inactive",
    first_name: "Peter",
    last_name: "Parker",
    phone: "+8 7784500150",
    email: "home@gmail.com",
    address: {
      street: "1890 Popular Avenue",
      country: "United Status",
      state: "Alaska",
      city: "San Diego",
      postalcode_zip: 92012,
    },
    documents: null,
    rating: 3.0,
    active_orders: {
      status: "active",
      orders: [
        {
          id: 1,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "John Doe",
          order_status: "processing",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
        {
          id: 2,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "Watson ",
          order_status: "completed",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
      ],
    },
  },
  {
    id: 9,
    profile_img: profile4,
    type: 'Customer',
    online_status: "inactive",
    first_name: "Peter",
    last_name: "Parker",
    phone: "+8 7784500150",
    email: "peterparker74@gmail.com",
    address: {
      street: "1890 Popular Avenue",
      country: "United Status",
      state: "Alaska",
      city: "San Diego",
      postalcode_zip: 92012,
    },
    documents: null,
    rating: 3.0,
    active_orders: {
      status: "active",
      orders: [
        {
          id: 1,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "John Doe",
          order_status: "processing",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
        {
          id: 2,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "Watson ",
          order_status: "completed",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
      ],
    },
  },
  {
    id: 10,
    profile_img: profile4,
    type: 'Customer',
    online_status: "inactive",
    first_name: "Peter",
    last_name: "john",
    phone: "+8 7784500150",
    email: "peterparker74@gmail.com",
    address: {
      street: "1890 Popular Avenue",
      country: "United Status",
      state: "Alaska",
      city: "San Diego",
      postalcode_zip: 92012,
    },
    documents: null,
    rating: 3.0,
    active_orders: {
      status: "active",
      orders: [
        {
          id: 1,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "John Doe",
          order_status: "processing",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
        {
          id: 2,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "Watson ",
          order_status: "completed",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
      ],
    },
  },
  {
    id: 11,
    profile_img: profile4,
    type: 'Customer',
    online_status: "inactive",
    first_name: "Peter",
    last_name: "khan",
    phone: "+8 7784500150",
    email: "peterparker74@gmail.com",
    address: {
      street: "1890 Popular Avenue",
      country: "United Status",
      state: "Alaska",
      city: "San Diego",
      postalcode_zip: 92012,
    },
    documents: null,
    rating: 3.0,
    active_orders: {
      status: "active",
      orders: [
        {
          id: 1,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "John Doe",
          order_status: "processing",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
        {
          id: 2,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "Watson ",
          order_status: "completed",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
      ],
    },
  },
  {
    id: 12,
    profile_img: profile4,
    type: 'Customer',
    online_status: "inactive",
    first_name: "Peter",
    last_name: "Parker",
    phone: "+8 7784500150",
    email: "peterparker74@gmail.com",
    address: {
      street: "1890 Popular Avenue",
      country: "United Status",
      state: "Alaska",
      city: "San Diego",
      postalcode_zip: 92012,
    },
    documents: null,
    rating: 3.0,
    active_orders: {
      status: "active",
      orders: [
        {
          id: 1,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "John Doe",
          order_status: "processing",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
        {
          id: 2,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "Watson ",
          order_status: "completed",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
      ],
    },
  },
  {
    id: 13,
    profile_img: profile4,
    type: 'Customer',
    online_status: "inactive",
    first_name: "Peter",
    last_name: "Parker",
    phone: "+8 7784500150",
    email: "peterparker74@gmail.com",
    address: {
      street: "1890 Popular Avenue",
      country: "United Status",
      state: "Alaska",
      city: "San Diego",
      postalcode_zip: 92012,
    },
    documents: null,
    rating: 3.0,
    active_orders: {
      status: "active",
      orders: [
        {
          id: 1,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "John Doe",
          order_status: "processing",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
        {
          id: 2,
          order_id: "#ORDERID44756210",
          source: "Lagos",
          destination: "Moscow",
          receiver_name: "Watson ",
          order_status: "completed",
          dimention: {
            l: 300,
            w: 200,
            h: 300,
          },
        },
      ],
    },
  },
];

//Use for Fake account-infos
export const accountInfos = [
  {
    id: 1,
    title: "Total Income",
    checkEnable: true,
    amount: 14434,
    currency: "USD",
    withdraw: false,
  },
  {
    id: 2,
    title: "Available Balance",
    checkEnable: false,
    amount: 14434,
    currency: "USD",
    withdraw: true,
  },
  {
    id: 3,
    title: "Withdrawn",
    checkEnable: false,
    amount: 14434,
    currency: "USD",
    withdraw: false,
  },
];

//Use for Fake All Transactions info
export const transactionsInfos = [
  {
    id: 1,
    transaction_id: "TR01AB9547628761M",
    date: '25/02/2022',
    amount: '240',
    currency: 'USD',


    status: "credited",
  },
  {
    id: 2,
    transaction_id: "TR01AB9547628761M",
    date: '25/02/2022',
    amount: '240',
    currency: 'USD',


    status: "credited",
  },
  {
    id: 3,
    transaction_id: "TR01AB9547628761M",
    date: '25/02/2022',
    amount: '240',
    currency: 'USD',

    status: "credited",
  },
  {
    id: 4,
    transaction_id: "TR01AB9547628761M",
    date: '25/02/2022',
    amount: '240',
    currency: 'USD',


    status: "Withdrawal",
  },
  {
    id: 5,
    transaction_id: "TR01AB9547628761M",
    date: '25/02/2022',
    amount: '240',
    currency: "USD",
    status: "credited",
  },
];

//Use for  Fake Orders list
export const orderLists = [
  {
    id: 1,
    order_id: "#ORDERID44756222",
    source: "Lagos",
    destination: "Moscow",
    receiver_name: "John Doe",
    order_status: "processing",
    dimention: {
      l: 300,
      w: 200,
      h: 300,
    },
    driver: "Phillips ",
    eta: "18 mins",
  },
  {
    id: 2,
    order_id: "#ORDERID44756210",
    source: "Lagos",
    destination: "Moscow",
    receiver_name: "Watson ",
    order_status: "completed",
    dimention: {
      l: 300,
      w: 200,
      h: 300,
    },
    driver: "Smith",
    eta: "18 mins",
  },
  {
    id: 3,
    order_id: "#ORDERID44756210",
    source: "Lagos",
    destination: "Moscow",
    receiver_name: "John Doe",
    order_status: "processing",
    dimention: {
      l: 300,
      w: 200,
      h: 300,
    },
    driver: "John Doe",
    eta: "18 mins",
  },
  {
    id: 4,
    order_id: "#ORDERID44756210",
    source: "Lagos 2",
    destination: "new york",
    receiver_name: "Watson ",
    order_status: "completed",
    dimention: {
      l: 300,
      w: 200,
      h: 300,
    },
    driver: "Phillips smith",
    eta: "18 mins",
  },
  {
    id: 5,
    order_id: "#ORDERID44756210",
    source: "Lagos",
    destination: "Moscow",
    receiver_name: "John Doe",
    order_status: "processing",
    dimention: {
      l: 300,
      w: 200,
      h: 300,
    },
    driver: "Phillips smith",
    eta: "18 mins",
  },
  {
    id: 6,
    order_id: "#ORDERID44756210",
    source: "Lagos 4",
    destination: "florida",
    receiver_name: "Watson ",
    order_status: "completed",
    dimention: {
      l: 300,
      w: 200,
      h: 300,
    },
    driver: "Phillips smith",
    eta: "18 mins",
  },
  {
    id: 7,
    order_id: "#ORDERID44756210",
    source: "Lagos 3",
    destination: "texas",
    receiver_name: "Watson ",
    order_status: "completed",
    dimention: {
      l: 300,
      w: 200,
      h: 300,
    },
    driver: "Phillips smith",
    eta: "18 mins",
  },
];

export const notifications = [
  {
    id: 1,
    time: "5 hours",
    notify_title: "New Order Request",
    message:
      "You have received new wait list request from john ode on 24 Feb, 9:00 PM",
  },
  {
    id: 2,
    time: "8 hours",
    notify_title: "New Order Request",
    message: "You have received new booking request from john Doe",
  },
  {
    id: 3,
    time: "12 hours",
    notify_title: "New Order Request",
    message: "  You have received new booking request from john Doe",
  },
  {
    id: 4,
    time: "10 hours",
    notify_title: "New Order Request",
    message: "  You have received new booking request from john Doe",
  },
  {
    id: 5,
    time: "12 hours",
    notify_title: "Order Cancelled",
    message: "Stellina parker has cancelled the booking on 24 Feb, 9:00",
  },
];

export const barChartData = {
  monthlyData: [
    {
      name: "Jan",
      pv: 5000,
      ul: 2000,
    },
    {
      name: "Feb",
      pv: 15098,
      ul: 25098,
    },
    {
      name: "Mar",
      pv: 5000,
      ul: 2000,
    },
    {
      name: "Apr",
      pv: 25000,
      ul: 25000,
    },
    {
      name: "May",
      pv: 15000,
      ul: 25000,
    },
    {
      name: "Jun",
      pv: 8000,
      ul: 2000,
    },
    {
      name: "July",
      pv: 23000,
      ul: 23000,
    },
    {
      name: "Aug",
      pv: 4300,
      ul: 2300,
    },
    {
      name: "Sep",
      pv: 6577,
      ul: 2577,
    },
    {
      name: "Oct",
      pv: 20000,
      ul: 20000,
    },
    {
      name: "Nov",
      pv: 20549,
      ul: 20549,
    },
    {
      name: "Dec",
      pv: 18699,
      ul: 28699,
    },
  ],
  yearlyData: [
    {
      name: "2015",
      pv: 5000,
      ul: 2000,
    },
    {
      name: "2016",
      pv: 15098,
      ul: 25098,
    },
    {
      name: "2017",
      pv: 5000,
      ul: 2000,
    },
    {
      name: "2018",
      pv: 25000,
      ul: 25000,
    },
    {
      name: "2019",
      pv: 15000,
      ul: 25000,
    },
    {
      name: "2020",
      pv: 8000,
      ul: 2000,
    },
    {
      name: "2021",
      pv: 23000,
      ul: 23000,
    },
    {
      name: "2022",
      pv: 4300,
      ul: 2300,
    },
  ],
  weaklyData: [
    {
      name: "01-09-2022",
      pv: 15000,
      ul: 12000,
    },
    {
      name: "02-09-2022",
      pv: 3098,
      ul: 28098,
    },
    {
      name: "03-09-2022",
      pv: 5000,
      ul: 2000,
    },
    {
      name: "04-09-2022",
      pv: 15000,
      ul: 20000,
    },
    {
      name: "05-09-2022",
      pv: 1000,
      ul: 5000,
    },
    {
      name: "06-09-2022",
      pv: 3000,
      ul: 8000,
    },
    {
      name: "07-09-2022",
      pv: 7500,
      ul: 2000,
    },
  ],
};

//Use for Fake All Drivers- Info
export const RecordItemsInfo = [

  {
    id: 2,
    profile_img: profile2,
    type: 'Customer',
    online_status: "active",
    source: "Dason Market",
    order_number: "#4215",
    carrier: "Fedex",
    status: "In transit",
    tracking_number: "PI33PD4583617593B",
    destination: "Victoria, CA",
    service_type: "Regular",
    date: '12/02/2022',
    amount: '240',
    currency: 'USD',
    shipping_weight: '520',
    delivery_option: 'Office  Pickup',
    insurance: 'No',
    packaging: 'Yes',
    invoice: '33',
    label: 'lable file',
    sender: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    consignee: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    system_of_measure: 'system_mesure_1',
    area: {
      length: '12',
      width: '50',
      height: '20'
    }
  },
  {
    id: 3,
    profile_img: profile5,
    type: 'Consignee',
    online_status: "inactive",
    source: "Tesco Market",
    order_number: "#3523",
    carrier: "Fedex",
    status: "Out for delivery",
    tracking_number: "PI33PD4583617593B",
    destination: "San Antonio, US",
    service_type: "Regular",
    date: '11/02/2022',
    amount: '240',
    currency: 'USD',
    shipping_weight: '520',
    delivery_option: 'Office  Pickup',
    insurance: 'No',
    packaging: 'Yes',
    invoice: '22',
    label: 'lable file',
    sender: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    consignee: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    system_of_measure: 'system_mesure_1',
    area: {
      length: '12',
      width: '50',
      height: '20'
    }
  },
  {
    id: 4,
    profile_img: profile3,
    type: 'Customer',
    online_status: "active",
    source: "Tesco Market",
    order_number: "#6745",
    carrier: "Fedex",
    status: "Received",
    tracking_number: "TR33PD4583617593B",
    destination: "Moscow, RU",
    service_type: "Express",
    date: '10/02/2022',
    amount: '240',
    currency: 'USD',
    shipping_weight: '520',
    delivery_option: 'Office  Pickup',
    insurance: 'No',
    packaging: 'Yes',
    invoice: '11',
    label: 'lable file',
    sender: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    consignee: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    system_of_measure: 'system_mesure_1',
    area: {
      length: '12',
      width: '50',
      height: '20'
    }
  },
  {
    id: 5,
    prfile_img: profile4,
    type: 'Consignee',
    online_status: "inactive",
    source: "Tesco Market",
    order_number: "#9707",
    carrier: "Fedex",
    status: "Dispatched",
    tracking_number: "TR33PD4583617593B",
    destination: "Quebec city, CA",
    service_type: "Express",
    date: '09/02/2022',
    amount: '100',
    currency: 'USD',
    shipping_weight: '520',
    delivery_option: 'Office  Pickup',
    insurance: 'No',
    packaging: 'Yes',
    invoice: '123',
    label: 'lable file',
    sender: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    consignee: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    system_of_measure: 'system_mesure_1',
    area: {
      length: '12',
      width: '50',
      height: '20'
    }
  },
  {
    id: 6,
    profile_img: profile4,
    type: 'Customer',
    online_status: "inactive",
    source: "Tesco Market",
    order_number: "#2147",
    carrier: "Fedex",
    status: "Received",
    tracking_number: "TR33PD4583617593B",
    destination: "New york, US",
    service_type: "Regular",
    date: '08/02/2022',
    amount: '50',
    currency: 'USD',
    shipping_weight: '520',
    delivery_option: 'Office  Pickup',
    insurance: 'No',
    packaging: 'Yes',
    invoice: '444',
    label: 'lable file',
    sender: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    consignee: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    system_of_measure: 'system_mesure_1',
    area: {
      length: '12',
      width: '50',
      height: '20'
    }
  },
  {
    id: 7,
    profile_img: profile4,
    type: 'Consignee',
    online_status: "inactive",
    source: "Tesco Market",
    order_number: "#8730",
    carrier: "Fedex",
    status: "Received",
    tracking_number: "TR33PD4583617593B",
    destination: "Abuja, NG",
    service_type: "Express",
    date: '07/02/2022',
    amount: '70',
    currency: 'USD',
    shipping_weight: '520',
    delivery_option: 'Office  Pickup',
    insurance: 'No',
    packaging: 'Yes',
    invoice: '555',
    label: 'lable file',
    sender: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    consignee: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    system_of_measure: 'system_mesure_1',
    area: {
      length: '12',
      width: '50',
      height: '20'
    }
  },
  {
    id: 8,
    profile_img: profile4,
    type: 'Consignee',
    online_status: "inactive",
    source: "Tesco Market",
    order_number: "#4215",
    carrier: "Fedex",
    status: "Received",
    tracking_number: "TR33PD4583617593B",
    destination: "Abuja, NG",
    service_type: "Express",
    date: '06/02/2022',
    amount: '240',
    currency: 'USD',
    shipping_weight: '520',
    delivery_option: 'Office  Pickup',
    insurance: 'No',
    packaging: 'Yes',
    invoice: '666',
    label: 'lable file',
    sender: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    consignee: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    system_of_measure: 'system_mesure_1',
    area: {
      length: '12',
      width: '50',
      height: '20'
    }
  },
  {
    id: 9,
    profile_img: profile4,
    type: 'Consignee',
    online_status: "inactive",
    source: "Tesco Market",
    order_number: "#4215",
    carrier: "Fedex",
    status: "Dispatched",
    tracking_number: "TR33PD4583617593B",
    destination: "Abuja, NG",
    service_type: "Regular",
    date: '05/02/2022',
    amount: '240',
    currency: 'USD',
    shipping_weight: '520',
    delivery_option: 'Office  Pickup',
    insurance: 'No',
    packaging: 'Yes',
    invoice: '555',
    label: 'lable file',
    sender: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    consignee: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    system_of_measure: 'system_mesure_1',
    area: {
      length: '12',
      width: '50',
      height: '20'
    }
  },
  {
    id: 10,
    profile_img: profile4,
    type: 'Customer',
    online_status: "inactive",
    source: "Tesco Market",
    order_number: "#4215",
    carrier: "Fedex",
    status: "Dispatched",
    tracking_number: "TR33PD4583617593B",
    destination: "Abuja, NG",
    service_type: "Regular",
    date: '04/02/2022',
    amount: '500',
    currency: 'USD',
    shipping_weight: '520',
    delivery_option: 'Office  Pickup',
    insurance: 'No',
    packaging: 'Yes',
    invoice: '222',
    label: 'lable file',
    sender: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    consignee: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    system_of_measure: 'system_mesure_1',
    area: {
      length: '12',
      width: '50',
      height: '20'
    }
  },
  {
    id: 11,
    profile_img: profile4,
    type: 'Customer',
    online_status: "inactive",
    source: "Tesco Market",
    order_number: "#4215",
    carrier: "Fedex",
    status: "Dispatched",
    tracking_number: "TR33PD4583617593B",
    destination: "Abuja, NG",
    service_type: "Express",
    date: '03/02/2022',
    amount: '360',
    currency: 'USD',
    shipping_weight: '520',
    delivery_option: 'Office  Pickup',
    insurance: 'No',
    packaging: 'Yes',
    invoice: '123',
    label: 'lable file',
    sender: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    consignee: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    system_of_measure: 'system_mesure_1',
    area: {
      length: '12',
      width: '50',
      height: '20'
    }
  },
  {
    id: 12,
    profile_img: profile4,
    type: 'Customer',
    online_status: "inactive",
    source: "Tesco Market",
    order_number: "#4215",
    carrier: "Fedex",
    status: "Dispatched",
    tracking_number: "TR33PD4583617593B",
    destination: "Abuja, NG",
    service_type: "Express",
    date: '02/02/2022',
    amount: '402',
    currency: 'USD',
    shipping_weight: '520',
    delivery_option: 'Office  Pickup',
    insurance: 'No',
    packaging: 'Yes',
    invoice: '123',
    label: 'lable file',
    sender: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    consignee: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    system_of_measure: 'system_mesure_1',
    area: {
      length: '12',
      width: '50',
      height: '20'
    }
  },
  {
    id: 13,
    profile_img: profile4,
    type: 'Customer',
    online_status: "inactive",
    source: "Tesco Market",
    order_number: "#4215",
    carrier: "Fedex",
    status: "Dispatched",
    tracking_number: "TR33PD4583617593B",
    destination: "Abuja, NG",
    service_type: "Express",
    date: '01/02/2022',
    amount: '190',
    currency: 'USD',
    shipping_weight: '520',
    delivery_option: 'Office  Pickup',
    insurance: 'No',
    packaging: 'Yes',
    invoice: '123',
    label: 'lable file',
    sender: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    consignee: {
      first_name: 'peter',
      last_name: 'parker',
      phone: '+81 2265 47887'
    },
    system_of_measure: 'system_mesure_1',
    area: {
      length: '12',
      width: '50',
      height: '20'
    }
  }
];
