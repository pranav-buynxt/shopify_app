// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import {
//   Layout,
//   Page,
//   FooterHelp,
//   Card,
//   Link,
//   Button,
//   FormLayout,
//   TextField,
//   AccountConnection,
//   ChoiceList, SettingToggle
// } from "@shopify/polaris";
// import { PlusIcon, NoteIcon } from "@shopify/polaris-icons";

// function App() {
//   const [store_name, setstore_name] = useState("");
//   const [gst, setgst] = useState("");
//   const [min_order_value, setmin_order_value] = useState("");
//   const [radius, setRadius] = useState("");
//   const [checkboxes, setCheckboxes] = useState([]);
//   const [connected, setConnected] = useState(false);

//   //requirement

//   const [selected, setSelected] = useState(['hidden']);
//   const handleChange = useCallback((value) => setSelected(value), []);



//   const handlestore_nameChange = useCallback((value) => setstore_name(value), []);
//   const handlegstChange = useCallback((value) => setgst(value), []);
//   const handlemin_order_valueChange = useCallback((value) => setmin_order_value(value), []);
//   const handleDeliveryRadiusChange = useCallback((value) => setRadius(value), []);
//   const handleCheckboxesChange = useCallback(
//     (value) => setCheckboxes(value),
//     []
//   );

//   const toggleConnection = useCallback(() => {
//     setConnected(!connected);
//   }, [connected]);

//   const breadcrumbs = [
//     { content: "Sample apps" },
//     { content: "Create React App" }
//   ];
//   const primaryAction = { content: "New product" };
//   const secondaryActions = [{ content: "Import", icon: PlusIcon }];

//   const choiceListItems = [
//     { label: "I accept the Terms of Service", value: "false" },
//     { label: "I consent to receiving min_order_values", value: "false2" }
//   ];

//   const categorychoiceListItems = [
//     { label: 'Grocery', value: 'Grocery' },
//     { label: 'Food & Beverages', value: 'F&B' },
//     { label: 'Home & Kitchen', value: 'Home & Kitchen' },
//     { label: 'Health & Wellness', value: 'Health & Wellness' },
//     { label: 'Electronics', value: 'Electronics' },
//     { label: 'Beauty & Personal Care', value: 'BPC' }
//   ];

//   const accountSectionDescription = connected
//     ? "Disconnect your account from your Shopify store."
//     : "Connect your account to your Shopify store.";

//   const accountMarkup = connected ? (
//     <DisconnectAccount onAction={toggleConnection} />
//   ) : (
//     <ConnectAccount onAction={toggleConnection} />
//   );

//   return (
//     <Page
//       title="Polaris"
//       breadcrumbs={breadcrumbs}
//       primaryAction={primaryAction}
//       secondaryActions={secondaryActions}
//     >
//       <Layout>
//         <Layout.AnnotatedSection
//           title="Style"
//           description="Customize the style of your checkout"
//         >
//           <SettingToggle
//             action={{
//               content: "Customize Checkout"
//             }}
//           >
//             Upload your store’s logo, change colors and fonts, and more.
//           </SettingToggle>
//         </Layout.AnnotatedSection>

//         <Layout.AnnotatedSection
//           title="Account"
//           description={accountSectionDescription}
//         >
//           {accountMarkup}
//         </Layout.AnnotatedSection>

//         <Layout.AnnotatedSection
//           title="Onboarding Form"
//           description="Form that connects you with ONDC."
//         >
//           <Card sectioned>
//             <FormLayout>
//               <FormLayout.Group>
//                 <TextField
//                   value={store_name}
//                   label="Store name"
//                   placeholder="ABC Store"
//                   onChange={handlestore_nameChange}
//                 />
//                 <TextField
//                   value={gst}
//                   label="GST Number"
//                   placeholder="29GGGGG1314R9Z6"
//                   onChange={handlegstChange}
//                 />
//               </FormLayout.Group>
//               <FormLayout.Group>
//                 <TextField
//                   value={min_order_value}
//                   label="Minimum Order Value"
//                   placeholder="250"
//                   onChange={handlemin_order_valueChange}
//                 />
//                 <TextField
//                   value={radius}
//                   label="Delivery Radius"
//                   placeholder="10 or PAN India"
//                   onChange={handlemin_order_valueChange}
//                 />
//               </FormLayout.Group>
//               <FormLayout.Group>
//               <ChoiceList
//                 title="Business Category"
//                 choices={categorychoiceListItems}
//                 selected={selected}
//                 onChange={handleChange}
//               />
//               </FormLayout.Group>
//               <ChoiceList
//                 allowMultiple
//                 choices={choiceListItems}
//                 selected={checkboxes}
//                 onChange={handleCheckboxesChange}
//               />
//               <Button primary>Submit</Button>
//             </FormLayout>
//           </Card>
//         </Layout.AnnotatedSection>

//         <Layout.Section>
//           <FooterHelp>
//             For more details on Polaris, visit our{" "}
//             <Link url="https://polaris.shopify.com">style guide</Link>.
//           </FooterHelp>
//         </Layout.Section>
//       </Layout>
//     </Page>
//   );
// }

// function ConnectAccount({ onAction }) {
//   return (
//     <AccountConnection
//       action={{ content: "Connect", onAction }}
//       details="No account connected"
//       termsOfService={
//         <p>
//           By clicking Connect, you are accepting Sample’s{" "}
//           <Link url="https://polaris.shopify.com">Terms and Conditions</Link>,
//           including a commission rate of 15% on sales.
//         </p>
//       }
//     />
//   );
// }

// function DisconnectAccount({ onAction }) {
//   return (
//     <AccountConnection
//       connected
//       action={{ content: "Disconnect", onAction }}
//       accountName="Tom Ford"
//       title={<Link url="http://google.com">Tom Ford</Link>}
//       details="Account id: d587647ae4"
//     />
//   );
// }

// //demo data fetching from database

// function App_demo() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/users')
//       .then(response => {
//         setUsers(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <div className="App">
//       <h1>Users List</h1>
//       <ul>
//         {users.map(user => (
//           <li key={user.MenuItemID}>{user.Code}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import {
  Layout,
  Page,
  FooterHelp,
  Card,
  Link,
  Button,
  FormLayout,
  TextField,
  AccountConnection,
  ChoiceList
} from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";

const API_URL = 'http://localhost:5000';
function App() {
  const [store_name, setStoreName] = useState("");
  const [gst, setGst] = useState("");
  const [min_order_value, setMinOrderValue] = useState("");
  const [radius, setRadius] = useState("");
  const [connected, setConnected] = useState(false);
  const [selected, setSelected] = useState(['hidden']);

  const handleStoreNameChange = useCallback((value) => setStoreName(value), []);
  const handleGstChange = useCallback((value) => setGst(value), []);
  const handleMinOrderValueChange = useCallback((value) => setMinOrderValue(value), []);
  const handleDeliveryRadiusChange = useCallback((value) => setRadius(value), []);
  const handleChange = useCallback((value) => setSelected(value), []);

  const toggleConnection = useCallback(() => {
    setConnected(true);
  }, []);

  const handleSubmit = useCallback(() => {
    const formData = {
      store_name,
      gst,
      min_order_value,
      radius,
      business_category: selected
    };

    axios.post(`${API_URL}/save-form`, formData)
      .then(response => {
        console.log('Form data saved:', response.data);
      })
      .catch(error => {
        console.error('Error saving form data:', error);
      });
  }, [store_name, gst, min_order_value, radius, selected]);

  const categoryChoiceListItems = [
    { label: 'Grocery', value: 'Grocery' },
    { label: 'Food & Beverages', value: 'F&B' },
    { label: 'Home & Kitchen', value: 'Home & Kitchen' },
    { label: 'Health & Wellness', value: 'Health & Wellness' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Beauty & Personal Care', value: 'BPC' }
  ];

  const accountSectionDescription = connected
    ? "Your account is connected."
    : "Connect your account to your Shopify store.";

  return (
    <Page title="Polaris">
      <Layout>
        {!connected && (
          <Layout.AnnotatedSection
            title="Account"
            description={accountSectionDescription}
          >
            <ConnectAccount onAction={toggleConnection} />
          </Layout.AnnotatedSection>
        )}

        {connected && (
          <Layout.AnnotatedSection
            title="Onboarding Form"
            description="Form that connects you with ONDC."
          >
            <Card sectioned>
              <FormLayout>
                <FormLayout.Group>
                  <TextField
                    value={store_name}
                    label="Store name"
                    placeholder="ABC Store"
                    onChange={handleStoreNameChange}
                  />
                  <TextField
                    value={gst}
                    label="GST Number"
                    placeholder="29GGGGG1314R9Z6"
                    onChange={handleGstChange}
                  />
                </FormLayout.Group>
                <FormLayout.Group>
                  <TextField
                    value={min_order_value}
                    label="Minimum Order Value"
                    placeholder="250"
                    onChange={handleMinOrderValueChange}
                  />
                  <TextField
                    value={radius}
                    label="Delivery Radius"
                    placeholder="10 or PAN India"
                    onChange={handleDeliveryRadiusChange}
                  />
                </FormLayout.Group>
                <FormLayout.Group>
                  <ChoiceList
                    title="Business Category"
                    choices={categoryChoiceListItems}
                    selected={selected}
                    onChange={handleChange}
                  />
                </FormLayout.Group>
                <Button primary onClick={handleSubmit}>Submit</Button>
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        )}

        <Layout.Section>
          <FooterHelp>
            For more details on Polaris, visit our{" "}
            <Link url="https://polaris.shopify.com">style guide</Link>.
          </FooterHelp>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function ConnectAccount({ onAction }) {
  return (
    <AccountConnection
      action={{ content: "Connect", onAction }}
      details="No account connected"
      termsOfService={
        <p>
          By clicking Connect, you are accepting Sample’s{" "}
          <Link url="https://polaris.shopify.com">Terms and Conditions</Link>,
          including a commission rate of 15% on sales.
        </p>
      }
    />
  );
}

export default App;
