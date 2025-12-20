import * as adminRepository from '../repository/adminRepository/admin.repo.js'

export const getUsersService = async () => {
    const users = await adminRepository.getUsers()
    return users
};