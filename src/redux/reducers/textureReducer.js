import {
    ADD_TEXTURE,
    DELETE_TEXTURE,
    GET_TEXTURE,
    GET_ERRORS,
    UPDATE_TEXTURE,
    GET_TEXTURE_BY_ID,
} from "./../actions/type";
const initialState = {
    textures: [],
    texture: {},
};
export default function (state = initialState, action) {
    switch (action.type) {
        // case GET_ERRORS:
        //return action.payload;
        case GET_TEXTURE:
            return {
                ...state,
                textures: action.payload,
            };
        case GET_TEXTURE_BY_ID:
            return {
                ...state,
                textures: action.payload,
            };
        case ADD_TEXTURE:
            return {
                ...state,
                textures: [action.payload, ...state.textures],
            };
        case DELETE_TEXTURE:
            var updatedTextures = [];
            updatedTextures = state.textures.filter((texture) => {
                if (texture._id != action.payload) return texture;
            });
            return {
                ...state,
                textures: updatedTextures,
            };
        case UPDATE_TEXTURE:
            let updatedTexture = state.textures.map((texture) => {
                if (texture._id == action.payload._id) return action.payload;
                return texture;
            });
            return {
                ...state,
                textures: updatedTexture,
                texture: {},
            };
        default:
            return state;
    }
}