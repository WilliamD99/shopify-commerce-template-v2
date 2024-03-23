'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { TAGS } from '../constants';
import {
  addCustomerAddress,
  checkoutCustomerAssociate,
  deleteCustomerAddress,
  updateCustomer,
  updateCustomerAddress
} from '../shopify';
// import { updateCustomerAddress } from '../shopify';

async function updateCustomerAction(prev: any, formData: FormData) {
  const rawFormData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    id: formData.get('userId')
  };

  const res = await updateCustomer(rawFormData);
  // Error
  if (res?.userErrors?.length && res.userErrors.length > 0) {
    return {
      message: res?.userErrors[0]?.message
    };
  } else {
    revalidateTag(TAGS.customer);
  }
  return {
    message: 'Profile updated'
  };
}

async function addCustomerAddressAction(prev: any, formData: FormData) {
  const cookieStore = cookies();
  const accessCode = cookieStore.get('access')?.value;

  if (!accessCode)
    return {
      message: 'Unauthorized, please sign in',
      status: 401
    };

  const rawFormData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    address1: formData.get('address1'),
    address2: formData.get('address2'),
    city: formData.get('city'),
    zoneCode: formData.get('zoneCode'),
    phoneNumber: formData.get('phone'),
    zip: formData.get('zip'),
    territoryCode: 'CA'
  };
  const res = await addCustomerAddress(accessCode, rawFormData);
  console.log(res);
  // Error
  if (res?.userErrors?.length && res.userErrors.length > 0) {
    return {
      message: res?.userErrors[0]?.message
    };
  } else {
    revalidateTag(TAGS.customer);
  }
  return {
    message: 'Profile updated',
    status: 200
  };
}

async function deleteCustomerAddressAction(id: string) {
  try {
    const cookieStore = cookies();
    const accessCode = cookieStore.get('access')?.value;
    if (!accessCode)
      return {
        message: 'Unauthorized, please sign in',
        status: 401
      };
    if (!id)
      return {
        message: 'Invalid ID provided',
        status: 403
      };

    const res = await deleteCustomerAddress(accessCode, id);
    // Error
    if (res?.userErrors?.length && res.userErrors.length > 0) {
      return {
        message: res?.userErrors[0]?.message
      };
    } else {
      revalidateTag(TAGS.customer);
    }
    return {
      message: 'Address Deleted',
      status: 200
    };
  } catch (e: any) {
    let message = e.error?.message ?? 'Server error';
    return {
      message: message,
      status: 403
    };
  }
}

async function editCustomerAddressAction(prev: any, formData: FormData) {
  try {
    const cookieStore = cookies();
    const accessCode = cookieStore.get('access')?.value;
    if (!accessCode)
      return {
        message: 'Unauthorized, please sign in',
        status: 401
      };

    const id = formData.get('id');
    const isDefault = formData.get('isDefault'); // This is a string
    const parsedIsDefault = isDefault ? JSON.parse(isDefault.toString()) : false;

    const rawFormData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      address1: formData.get('address1'),
      address2: formData.get('address2'),
      city: formData.get('city'),
      zoneCode: formData.get('zoneCode'),
      phoneNumber: formData.get('phone'),
      zip: formData.get('zip'),
      territoryCode: 'CA'
    };

    if (!id)
      return {
        message: 'Invalid ID provided',
        status: 403
      };

    const res = await updateCustomerAddress(accessCode, id, rawFormData, parsedIsDefault);
    // Error
    if (res?.userErrors?.length && res.userErrors.length > 0) {
      return {
        message: res?.userErrors[0]?.message
      };
    } else {
      revalidateTag(TAGS.customer);
    }
    return {
      message: 'Profile updated',
      status: 200
    };
  } catch (e: any) {
    let message = e.error?.message ?? 'Server error';
    return {
      message: message,
      status: 403
    };
  }
}

async function associateCheckoutCustomerAction(checkoutId: string) {
  try {
    let test = await checkoutCustomerAssociate(checkoutId);
  } catch (e) {
    console.log(e);
  }
}

export {
  addCustomerAddressAction,
  associateCheckoutCustomerAction,
  deleteCustomerAddressAction,
  editCustomerAddressAction,
  updateCustomerAction
};
