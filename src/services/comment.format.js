export default async function FormatComments(comments) {

    const comment = await Promise.all(comments.map(async (comment) => {
        return {
            id: comment.coment_id,
            recipeId: comment.recipe_id,
            owner: {
                id: comment.user_basic_information.user_id,
                username: comment.user_basic_information.user_username,
                img: comment.user_basic_information.user_pfp
            },
            comment: comment.comment,
            isResponse: comment.is_response,
            responseTo: comment.response_to,
            createdAt: comment.created_at
        }
    }))

    return comment
}