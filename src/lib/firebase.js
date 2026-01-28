// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  getFirestore,
  updateDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

// ////////////////////////////
//   Auth Related Functions //
// //////////////////////////

export const useAuthenticationFunctions = () => {
  const logout = async () => {
    await signOut(auth);
    localStorage.clear();
  };

  const login = async (email, password) => {
    console.log("logging in ... ");
    console.log("email >> ", email);
    console.log("password >> ", password);

    try {
      // Authenticate the user with the provided email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Return a success message or code
      return {
        success: true,
        message: "Login successful",
        loggedInUser: userCredential.user,
      };
    } catch (error) {
      // Handle authentication errors
      console.error("Login failed", error);

      // Return an error message or code
      return {
        success: false,
        error: error.code,
        message: error.message,
        loggedInUser: null,
      };
    }
  };

  return {
    login,
    logout,
  };
};

// ///////////////////////////////
//   Product Related Functions //
// /////////////////////////////
export const useProductFunctions = () => {
  /**
   * Add a new product to Firestore
   */
  const addProduct = async (data) => {
    console.log("add_product()_initialized ...");
    console.log("product_data_to_use >> ", data);

    try {
      const newProductRef = doc(collection(db, "Products"));
      await setDoc(newProductRef, data);
      return {
        collection: "products",
        success: true,
        data: { id: newProductRef.id, ...data },
        message: `product_added_successfully`,
      };
    } catch (e) {
      console.log("Error in adding product >>> ", e);
      return {
        collection: "products",
        success: false,
        data: null,
        message: `product_adding_failed ${e}`,
      };
    }
  };

  /**
   * Fetch all products from Firestore
   */
  const fetchAllProducts = async () => {
    console.log("fetch_all_products() initialized ...");
    const productCollectionRef = collection(db, "Products");
    try {
      const allProductsQuery = query(productCollectionRef);
      const allProductsSnapShot = await getDocs(allProductsQuery);
      console.log("all_products_snapshot >> ", allProductsSnapShot);

      if (allProductsSnapShot?.empty) {
        console.log("No Products Found");
        return {
          collection: "products",
          success: false,
          data: null,
          message: "No Products Found",
        };
      } else {
        console.log("all_product_snapshot >> ", allProductsSnapShot);
        const allProductsData = allProductsSnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return {
          collection: "products",
          success: true,
          data: allProductsData,
          message: `${allProductsData.length} products_found`,
        };
      }
    } catch (error) {
      console.log("Error in getting products >>> ", error);
      return {
        collection: "products",
        success: false,
        data: null,
        message: `product_fetching_failed ${error}`,
      };
    }
  };

  /**
   * Fetch a single product by ID
   */
  const fetchProductDetail = async (id) => {
    try {
      const productDocRef = doc(db, "Products", id);
      const productSnap = await getDoc(productDocRef);

      if (productSnap.exists()) {
        const productData = { id: productSnap.id, ...productSnap.data() };
        return {
          success: true,
          data: productData,
          message: "Product found",
        };
      } else {
        return {
          success: false,
          data: null,
          message: "Product not found",
        };
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      return {
        success: false,
        data: null,
        message: "Error fetching product",
      };
    }
  };

  /**
   * Delete a product by ID (including Cloudinary images)
   */
  const deleteProduct = async (id) => {
    try {
      const productDocRef = doc(db, "Products", id);
      const productDoc = await getDoc(productDocRef);

      if (productDoc.exists()) {
        // TODO: Handle Cloudinary image deletion
        // For now, just delete the document
        await deleteDoc(productDocRef);

        return {
          collection: "products",
          success: true,
          data: null,
          message: `product_deleted_successfully`,
        };
      } else {
        return {
          collection: "products",
          success: false,
          data: null,
          message: `product_not_found`,
        };
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      return {
        collection: "products",
        success: false,
        data: null,
        message: `product_deletion_failed ${error}`,
      };
    }
  };

  /**
   * Fetch products by category (e.g., "head-face", "respiratory")
   */
  const fetchAllProductsByCategory = async (category) => {
    console.log(`fetchAllProductsByCategory(${category}) initialized ...`);
    const productCollectionRef = collection(db, "Products");
    try {
      const productsQuery = query(
        productCollectionRef,
        where("category", "==", category),
      );
      const productsSnapshot = await getDocs(productsQuery);
      console.log("products_snapshot >> ", productsSnapshot);

      if (productsSnapshot?.empty) {
        console.log(`No Products Found in category: ${category}`);
        return {
          collection: "products",
          success: false,
          data: null,
          message: `No Products Found in category: ${category}`,
        };
      } else {
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return {
          collection: "products",
          success: true,
          data: productsData,
          message: `${productsData.length} products found in category: ${category}`,
        };
      }
    } catch (error) {
      console.log(
        `Error in getting products in category: ${category} >>> `,
        error,
      );
      return {
        collection: "products",
        success: false,
        data: null,
        message: `product_fetching_failed ${error}`,
      };
    }
  };

  /**
   * Fetch products by attribute (e.g., trending=true, monthlyOffer=true)
   */
  const fetchAllProductsByAttribute = async (attribute) => {
    console.log(`fetchAllProductsByAttribute(${attribute}) initialized ...`);
    const productCollectionRef = collection(db, "Products");
    try {
      const productsQuery = query(
        productCollectionRef,
        where(attribute, "==", true),
      );

      const productsSnapshot = await getDocs(productsQuery);
      console.log("products_snapshot >> ", productsSnapshot);

      if (productsSnapshot.empty) {
        console.log(`No Products Found with ${attribute}`);
        return {
          collection: "products",
          success: false,
          data: null,
          message: `No Products Found with ${attribute}`,
        };
      } else {
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return {
          collection: "products",
          success: true,
          data: productsData,
          message: `${productsData.length} products found with ${attribute}`,
        };
      }
    } catch (error) {
      console.log(`Error in getting products with ${attribute} >>> `, error);
      return {
        collection: "products",
        success: false,
        data: null,
        message: `product_fetching_failed ${error}`,
      };
    }
  };

  // TODO: Implement product status management
  // Future functions for Marvel Safety:
  // - markProductAsHot(id: string)
  // - markProductAsSale(id: string)
  // - markProductAsNew(id: string)
  // - clearProductStatus(id: string)
  // Status values: "hot" | "sale" | "new" | "none"

  return {
    addProduct,
    fetchAllProducts,
    fetchProductDetail,
    deleteProduct,
    fetchAllProductsByCategory,
    fetchAllProductsByAttribute,
  };
};

// ///////////////////////////
//   Order Related Functions //
// ///////////////////////////

// ✅ Add order to Firestore
// ✅ Add order to Firestore
export async function addOrderToFirestore(data) {
  console.log("📦 [Firebase] Adding order to Firestore...");
  console.log("📦 [Firebase] Order data:", JSON.stringify(data, null, 2));

  try {
    const cleanData = JSON.parse(JSON.stringify(data));
    const orderRef = doc(collection(db, "orders"));
    console.log("📦 [Firebase] Generated order ID:", orderRef.id);

    await setDoc(orderRef, {
      ...cleanData,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    console.log("✅ [Firebase] Order created successfully!");
    console.log("✅ [Firebase] Order ID:", orderRef.id);

    return { success: true, orderId: orderRef.id };
  } catch (error) {
    console.error("❌ [Firebase] Order creation FAILED:", error);
    console.error("❌ [Firebase] Error details:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return { success: false, error: error.message };
  }
}

// ✅ Fetch order by ID
export async function fetchOrderFromFirestore(orderId) {
  console.log("🔍 [Firebase] Fetching order by ID:", orderId);

  try {
    const orderDoc = await getDoc(doc(db, "orders", orderId));

    if (orderDoc.exists()) {
      console.log("✅ [Firebase] Order found!");
      console.log(
        "✅ [Firebase] Order data:",
        JSON.stringify(orderDoc.data(), null, 2),
      );

      console.log("return data for order >> ", {
        success: true,
        data: { id: orderDoc.id, ...orderDoc.data() },
      });

      return {
        success: true,
        data: { id: orderDoc.id, ...orderDoc.data() },
      };
    }

    console.warn("⚠️ [Firebase] Order not found for ID:", orderId);
    return { success: false, data: null };
  } catch (error) {
    console.error("❌ [Firebase] Order fetch FAILED:", error);
    console.error("❌ [Firebase] Error details:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return { success: false, error: error.message };
  }
}
